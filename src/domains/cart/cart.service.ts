import { Carts } from "./models/cart.model.js";

import type {
  AddProductToCartInput,
  CreateCartInput,
  UpdateCartItemQuantityInput,
} from "./types/cart.service.types.js";
import type { CartLean } from "./types/cart.types.js";

import { toObjectId } from "../../shared/utils/mongoose.utils.js";

import { CART_STATE } from "./cart.contants.js";

export class CartService {
  static async createCart({
    userId,
    product,
  }: CreateCartInput): Promise<CartLean> {
    const createdCart = await Carts.findOneAndUpdate(
      {
        cartUser: toObjectId(userId),
        cartState: CART_STATE.ACTIVE,
      },
      {
        $addToSet: {
          cartItems: product,
        },
      },
      {
        upsert: true,
        new: true,
      },
    ).lean();

    return createdCart;
  }

  static async updateCartItemQuantity({
    userId,
    product,
  }: UpdateCartItemQuantityInput): Promise<CartLean> {
    const { productId, quantity } = product;

    return await Carts.findOneAndUpdate(
      {
        cartUser: toObjectId(userId),
        cartState: CART_STATE.ACTIVE,
        "cartItems.productId": toObjectId(productId),
      },
      {
        $inc: {
          "cartItems.$.quantity": quantity,
        },
      },
      {
        upsert: true,
        new: true,
      },
    ).lean();
  }

  static async addProductToCart({ userId, product }: AddProductToCartInput) {
    const ownedActiveCart = await Carts.findOne({
      cartUser: toObjectId(userId),
      cartState: CART_STATE.ACTIVE,
    });

    if (!ownedActiveCart) {
      return await this.createCart({
        userId,
        product,
      });
    }

    if (ownedActiveCart.cartItems.length === 0) {
      ownedActiveCart.cartItems.push(product);
      return await ownedActiveCart.save();
    }

    return await this.updateCartItemQuantity({
      userId,
      product,
    });
  }
}
