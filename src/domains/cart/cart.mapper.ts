import _ from "lodash";

import type { CartLean } from "./types/cart.types.js";

export class CartMapper {
  static toPublic(cart: CartLean) {
    return {
      ..._.pick(cart, ["state", "createdAt", "updatedAt"]),
      id: cart._id.toString(),
      userId: cart.user.toString(),

      items: (cart.items || []).map((item) => ({
        ..._.pick(item, ["quantity", "name", "price"]),
        productId: item.product.toString(),
        shopId: item.shop.toString(),
      })),
    };
  }
}
