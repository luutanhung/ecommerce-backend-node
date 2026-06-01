import _ from "lodash";
import type { ClientSession } from "mongoose";

import type {
  CheckoutOrderInput,
  CreateOrderInput,
  CreatePendingOrderInput,
  OrderItem,
  OrderShippingAddress,
  OrderSummary,
  ShopOrders,
} from "./types/order.service.types.js";
import type { OrderLean } from "./types/order.types.js";

import { BadRequestAppError } from "../../core/error/badRequestAppError.js";
import { ConflictAppError } from "../../core/error/conflictAppError.js";
import { NotFoundAppError } from "../../core/error/notFoundAppError.js";
import { DiscountService } from "../../pricing/services/discount.service.js";
import { ResCode } from "../../shared/constants/resCode.constants.js";
import { withTransaction } from "../../shared/helpers/withTransaction.js";
import { LockService } from "../../shared/services/lock.service.js";
import type { TransactionOptions } from "../../shared/types/mongoose.type.js";
import { toObjectId } from "../../shared/utils/mongoose.utils.js";
import { Users } from "../access/models/user.model.js";
import type { UserDocument } from "../access/types/user.types.js";
import { CART_STATE } from "../cart/cart.contants.js";
import { Carts } from "../cart/models/cart.model.js";
import { InventoryService } from "../inventory/inventory.service.js";
import { PAYMENT_STATUS } from "../payment/payment.constants.js";
import { Products } from "../product/models/product.model.js";

import { ORDER_STATUS } from "./order.constants.js";
import { Orders } from "./order.model.js";

export class OrderService {
  /**
   * Preview order before making a purchase.
   */
  static async checkoutOrder({
    userId,
    cartId,
    shopOrders,
  }: CheckoutOrderInput) {
    const cart = await Carts.findOne({
      _id: toObjectId(cartId),
      user: toObjectId(userId),
      state: CART_STATE.ACTIVE,
    });

    if (!cart) {
      throw new NotFoundAppError({
        code: ResCode.CART_NOT_FOUND,
      });
    }

    let merchandiseSubtotal: number = 0;

    let discountSubtotal: number = 0;
    // eslint-disable-next-line
    let shippingSubtotal: number = 0;
    const checkoutShopOrders = [] as ShopOrders;

    for (const shopOrder of shopOrders) {
      const { shopId, items } = shopOrder;

      const productIds = items.map((item) => toObjectId(item.productId));
      const products = await Products.find({
        _id: {
          $in: productIds,
        },
      }).lean();

      // CRITICAL: throw error if not found any valid products.
      if (products.length === 0) {
        throw new BadRequestAppError({
          code: ResCode.PRODUCT_NOT_FOUND,
        });
      }

      const orderItems: OrderItem[] = [];

      const productMap = new Map(
        products.map((product) => [product._id.toString(), product]),
      );

      const eligibleItems = items.filter((item) =>
        productMap.has(item.productId),
      );

      for (const item of eligibleItems) {
        const { productId, quantity } = item;

        const product = productMap.get(productId);

        if (!product) continue;

        const orderItemSubTotal = quantity * product.price;

        merchandiseSubtotal += orderItemSubTotal;

        orderItems.push({
          shopId,
          productId: item.productId,
          name: product.name,
          thumb: product.thumb,
          price: product.price,
          quantity,
          subtotal: orderItemSubTotal,
        });
      }

      checkoutShopOrders.push({
        shopId,
        items: orderItems,
      });

      const discountResult = await DiscountService.applyDiscountToProducts({
        shopId: shopOrder.shopId,
        code: shopOrder.discountCode,
        products: eligibleItems,
      });

      discountSubtotal += discountResult.discountAmount;
    }

    const orderTotal =
      merchandiseSubtotal - discountSubtotal + shippingSubtotal;

    const orderSummary: OrderSummary = {
      merchandiseSubtotal,
      discountSubtotal,
      shippingSubtotal,
      orderTotal,
    };

    return {
      orderSummary,
      shopOrders: checkoutShopOrders,
    };
  }

  private static getShippingAddress(
    user: UserDocument,
    orderShippingAddress?: OrderShippingAddress,
  ) {
    const phoneNumber = user.phoneNumber;

    if (_.isNil(phoneNumber)) {
      throw new BadRequestAppError({
        code: ResCode.USER_PHONE_NUMBER_REQUIRED,
      });
    }
    if (!_.isNil(orderShippingAddress)) {
      return {
        ...orderShippingAddress,
        phoneNumber,
      };
    }

    const primaryAddress = user.addresses.filter((addr) => addr.isPrimary)[0];
    if (!primaryAddress) {
      throw new BadRequestAppError({
        code: ResCode.ORDER_SHIPPING_ADDRESS_REQUIRED,
      });
    }

    return {
      phoneNumber,
      addressLine: primaryAddress.addressLine,
      ward: primaryAddress.ward || undefined,
      district: primaryAddress.district || undefined,
      province: primaryAddress.province || undefined,
    };
  }

  static async createOrder({
    userId,
    cartId,
    shopOrders,
    shippingAddress,
  }: CreateOrderInput): Promise<OrderLean> {
    const user = await Users.findOne({
      _id: toObjectId(userId),
    });

    if (!user) {
      throw new NotFoundAppError({
        code: ResCode.USER_NOT_FOUND,
      });
    }

    const orderShippingAddress = this.getShippingAddress(user, shippingAddress);

    const { orderSummary, shopOrders: checkoutShopOrders } =
      await this.checkoutOrder({
        userId,
        cartId,
        shopOrders,
      });

    const orderItems: OrderItem[] = checkoutShopOrders.flatMap(
      (shopOrder) => shopOrder.items,
    );

    // Prevent deadlocks by locking in deterministic order.
    const sortedOrderItems = [...orderItems].sort((a, b) => {
      return a.productId.toString().localeCompare(b.productId.toString());
    });

    const lockKeys: string[] = [];

    try {
      for (const orderItem of sortedOrderItems) {
        const { productId } = orderItem;

        const lockKey = `inventory:lock:${productId}`;

        const acquired = await LockService.acquire(lockKey, 30);

        if (!acquired) {
          throw new ConflictAppError({
            code: ResCode.ORDER_PRODUCT_LOCKED,
          });
        }

        lockKeys.push(lockKey);
      }

      // Create a new order.
      const createdPendingOrder = await withTransaction(
        async (session: ClientSession) => {
          /**
           * Double-check inventory while locks are held.
           */
          for (const orderItem of sortedOrderItems) {
            await InventoryService.checkAvailability(
              {
                productId: orderItem.productId,
                quantity: orderItem.quantity,
              },
              { session },
            );
          }

          /**
           * Create pending order.
           */
          const createdOrder = await this.createPendingOrder(
            {
              userId,
              orderItems,
              orderSummary,
              orderShippingAddress,
            },
            {
              session,
            },
          );

          /**
           * Reserve
           * */
          for (const orderItem of sortedOrderItems) {
            await InventoryService.reserveInventory(
              {
                orderId: createdOrder._id.toString(),
                productId: orderItem.productId.toString(),
                quantity: orderItem.quantity,
                expiresAt: new Date(Date.now() + 15 * 60 * 1000),
              },
              { session },
            );
          }

          return createdOrder;
        },
      );

      return createdPendingOrder.toObject();
    } finally {
      await Promise.all(
        lockKeys.map((lockKey) => LockService.release(lockKey)),
      );
    }
  }

  private static async createPendingOrder(
    {
      userId,
      orderItems,
      orderSummary,
      orderShippingAddress,
    }: CreatePendingOrderInput,
    options: TransactionOptions = {},
  ) {
    const [createdPendingOrder] = await Orders.create(
      [
        {
          user: toObjectId(userId),
          items: orderItems.map((item) => {
            return {
              product: toObjectId(item.productId),
              shop: toObjectId(item.shopId),
              ..._.pick(item, [
                "name",
                "thumb",
                "price",
                "quantity",
                "subtotal",
              ]),
            };
          }),
          summary: orderSummary,
          status: ORDER_STATUS.PENDING,
          paymentStatus: PAYMENT_STATUS.PENDING,
          shippingAddress: orderShippingAddress,
        },
      ],
      {
        session: options.session,
      },
    );

    if (!createdPendingOrder) {
      throw new BadRequestAppError({
        code: ResCode.ORDER_CREATE_ORDER_FAILED,
      });
    }

    return createdPendingOrder;
  }
}
