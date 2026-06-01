import _ from "lodash";

import type { ShopLean } from "../types/shop.types.js";

export class ShopMapper {
  static toPublic(shop: ShopLean) {
    return {
      ..._.pick(shop, [
        "name",
        "slug",
        "description",
        "logo",
        "status",
        "createdAt",
        "updatedAt",
      ]),
      id: shop._id.toString(),
      userId: shop.user.toString(),
    };
  }
}
