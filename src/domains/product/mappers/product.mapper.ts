import _ from "lodash";
import type { PaginateResult } from "mongoose";

import type { ProductLean } from "../types/product.types.js";

import { sanitizePagination } from "../../../shared/utils/sanitizer.utils.js";

export class ProductMapper {
  static toPublic(product: ProductLean) {
    return {
      ..._.pick(product, [
        "category",
        "name",
        "thumb",
        "price",
        "quantity",
        "currency",
        "description",
        "slug",
        "averageRating",
        "attributes",
        "images",
        "shipping",
      ]),
      id: product._id.toString(),
      userId: product.user.toString(),
      shopId: product.shop.toString(),
    };
  }

  static toPaginate(pagination: PaginateResult<ProductLean>) {
    return sanitizePagination(pagination, this.toPublic);
  }
}
