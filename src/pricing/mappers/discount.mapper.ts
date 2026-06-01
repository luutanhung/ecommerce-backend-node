import _ from "lodash";
import type { PaginateResult } from "mongoose";

import type { DiscountLean } from "../types/discount.types.js";

import { sanitizePagination } from "../../shared/utils/sanitizer.utils.js";

export class DiscountMapper {
  static toPublic(discount: DiscountLean) {
    return {
      ..._.pick(discount, [
        "code",
        "name",
        "description",
        "type",
        "config",
        "startsAt",
        "endsAt",
        "usageLimit",
        "usedCount",
        "isActive",
        "minOrderTotal",
        "appliesTo",
        "applicableProducts",
        "applicableCategories",
        "createdAt",
        "updatedAt",
      ]),
      id: discount._id.toString(),
    };
  }

  static toPaginate(pagination: PaginateResult<DiscountLean>) {
    return sanitizePagination(pagination, this.toPublic);
  }
}
