import type {
  CheckoutOrderInput,
  CheckoutSummary,
  CreateOrderInput,
  OrderItem,
  ShopOrders,
} from "./types/order.service.types.js";

import { BadRequestAppError } from "../../core/error/badRequestAppError.js";
import { ConflictAppError } from "../../core/error/conflictAppError.js";
import { NotFoundAppError } from "../../core/error/notFoundAppError.js";
import { DiscountService } from "../../pricing/services/discount.service.js";
import { ResCode } from "../../shared/constants/resCode.constants.js";
import { LockService } from "../../shared/services/lock.service.js";
import { toObjectId } from "../../shared/utils/mongoose.utils.js";
import { CART_STATE } from "../cart/cart.contants.js";
import { Carts } from "../cart/models/cart.model.js";
import { InventoryService } from "../inventory/inventory.service.js";
import { Products } from "../product/models/product.model.js";

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

    const checkoutSummary: CheckoutSummary = {
      merchandiseSubtotal,
      discountSubtotal,
      shippingSubtotal,
      orderTotal,
    };

    return {
      checkoutSummary,
      shopOrders: checkoutShopOrders,
    };
  }

  static async createOrder({ userId, cartId, shopOrders }: CreateOrderInput) {
    // eslint-disable-next-line
    const { checkoutSummary, shopOrders: checkoutShopOrders } =
      await this.checkoutOrder({
        userId,
        cartId,
        shopOrders,
      });

    const orderItems: OrderItem[] = checkoutShopOrders.flatMap(
      (shopOrder) => shopOrder.items,
    );

    const sortedOrderItems = [...orderItems].sort((a, b) => {
      return a.productId.toString().localeCompare(b.productId.toString());
    });

    const lockKeys: string[] = [];

    try {
      for (const orderItem of sortedOrderItems) {
        const { productId, quantity } = orderItem;

        const lockKey = `inventory:lock:${productId}`;

        const acquired = await LockService.acquire(lockKey, 30);

        if (!acquired) {
          throw new ConflictAppError({
            code: ResCode.ORDER_PRODUCT_LOCKED,
          });
        }

        lockKeys.push(lockKey);

        // Reserve inventory.
        await InventoryService.reserveInventory({
          orderId: "xxx",
          productId,
          quantity,
          expiresAt: new Date(Date.now() + 15 * 60 * 1000),
        });
      }
    } finally {
      await Promise.all(
        lockKeys.map((lockKey) => LockService.release(lockKey)),
      );
    }
  }
}
