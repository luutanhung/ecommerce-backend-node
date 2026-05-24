import { Carts } from "./models/cart.model.js";

import type {
  AddProductToCartInput,
  CreateCartInput,
} from "./types/cart.service.types.js";
import type { CartDocument, CartLean } from "./types/cart.types.js";

import { toObjectId } from "../../shared/utils/mongoose.utils.js";

import { CART_STATE } from "./cart.contants.js";

export class CartService {
  static async createCart({ userId }: CreateCartInput): Promise<CartLean> {
    const createdCart = await Carts.create({
      cartUser: toObjectId(userId),
      cartState: CART_STATE.ACTIVE,
    });

    return createdCart.toObject();
  }

  static async addProductToCart({
    userId,
    product,
  }: AddProductToCartInput): Promise<CartLean> {
    const ownedActiveCart = await Carts.findOne({
      cartUser: toObjectId(userId),
      cartState: CART_STATE.ACTIVE,
    }).lean();

    const query: Record<string, unknown> = {};
    if (!ownedActiveCart) {
      const createdCart = await this.createCart({ userId });
      query._id = createdCart._id;
    } else {
      query._id = ownedActiveCart._id;
    }

    const updatedCart = (await Carts.findOneAndUpdate(
      query,
      {
        $addToSet: {
          cartItems: product,
        },
      },
      {
        upsert: true,
        new: true,
      },
    )) as CartDocument;

    return updatedCart.toObject();
  }
}
