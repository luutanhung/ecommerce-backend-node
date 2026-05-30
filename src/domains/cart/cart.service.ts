import { Carts } from "./models/cart.model.js";

import type {
  AddProductToCartInput,
  CreateCartInput,
  UpdateCartItemQuantityInput,
} from "./types/cart.service.types.js";
import type { CartDocument, CartLean } from "./types/cart.types.js";

import { BadRequestAppError } from "../../core/error/badRequestAppError.js";
import { ResCode } from "../../shared/constants/resCode.constants.js";
import type { TransactionOptions } from "../../shared/types/mongoose.type.js";
import { toObjectId } from "../../shared/utils/mongoose.utils.js";

import { CART_STATE } from "./cart.contants.js";

export class CartService {
  /**
   * Create user's cart.
   */
  static async createCart(
    { userId }: CreateCartInput,
    options: TransactionOptions = {},
  ): Promise<CartDocument> {
    const foundCart = await Carts.findOne({
      user: toObjectId(userId),
    });

    if (foundCart) {
      return foundCart;
    }

    const [createdCart] = await Carts.create(
      [
        {
          user: toObjectId(userId),
          state: CART_STATE.ACTIVE,
        },
      ],
      {
        session: options.session,
      },
    );

    if (!createdCart) {
      throw new BadRequestAppError({
        code: ResCode.CART_CREATE_FAILED,
      });
    }

    return createdCart;
  }

  /**
   * Add product to cart.
   */
  static async addProductToCart({ userId, product }: AddProductToCartInput) {
    let ownedActiveCart = await Carts.findOne({
      cartUser: toObjectId(userId),
      cartState: CART_STATE.ACTIVE,
    });

    if (!ownedActiveCart) {
      ownedActiveCart = await this.createCart({
        userId,
      });
    }

    if (ownedActiveCart.items.length === 0) {
      ownedActiveCart.items.push(product);
      return await ownedActiveCart.save();
    }

    return await this.updateCartItemQuantity({
      userId,
      product,
    });
  }

  /**
   * Update cart items' quantity.
   */
  static async updateCartItemQuantity({
    userId,
    product,
  }: UpdateCartItemQuantityInput): Promise<CartLean> {
    const { productId, quantity } = product;

    return await Carts.findOneAndUpdate(
      {
        user: toObjectId(userId),
        state: CART_STATE.ACTIVE,
        "items.productId": toObjectId(productId),
      },
      {
        $inc: {
          "items.$.quantity": quantity,
        },
      },
      {
        upsert: true,
        new: true,
      },
    ).lean();
  }
}
