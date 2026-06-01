import _ from "lodash";

import type { OrderLean } from "./types/order.types.js";

export class OrderMapper {
  private static formatOrderItems(items: OrderLean["items"]) {
    return items.map((item) => {
      return {
        productId: item.product.toString(),
        shopId: item.shop.toString(),
        ..._.pick(item, ["name", "thumb", "price", "quantity", "subtotal"]),
      };
    });
  }
  static toPublic(order: OrderLean) {
    return {
      userId: order.user.toString(),
      items: this.formatOrderItems(order.items),
      ..._.pick(order, [
        "orderNumber",
        "summary",
        "shippingAddress",
        "status",
        "paymentStatus",
        "note",
        "paidAt",
        "cancelledAt",
        "deliveredAt",
        "createdAt",
        "updatedAt",
      ]),
    };
  }
}
