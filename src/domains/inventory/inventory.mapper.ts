import _ from "lodash";

import type { InventoryLean } from "./types/inventory.model.types.js";

export class InventoryMapper {
  static toPublic(inventory: InventoryLean) {
    return {
      ..._.pick(inventory, [
        "stock",
        "location",
        "reservations",
        "createdAt",
        "updatedAt",
      ]),
      id: inventory._id.toString(),
      shopId: inventory.shop.toString(),
      productId: inventory.product.toString(),
    };
  }
}
