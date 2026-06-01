import _ from "lodash";

import type { CategoryLean } from "../types/category.types.js";

export class CategoryMapper {
  static toPublic(category: CategoryLean) {
    return {
      userId: category.user.toString(),
      shopId: category.shop.toString(),
      id: category._id.toString(),
      ..._.pick(category, [
        "name",
        "slug",
        "description",
        "parent",
        "ancestors",
        "createdAt",
        "updatedAt",
        "isActive",
      ]),
    };
  }
}
