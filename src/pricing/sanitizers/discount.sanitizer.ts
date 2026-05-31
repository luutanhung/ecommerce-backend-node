import type { DiscountLean } from "../types/discount.types.js";

import { transformMongoId } from "../../shared/utils/mongoose.utils.js";
import { pickFields } from "../../shared/utils/sanitizer.utils.js";

export const DEFAULT_DISCOUNT_SELECT_FIELDS: Array<keyof DiscountLean> = [
  "_id",
  "shop",
  "name",
  "description",
  "type",
  "config",
  "code",
  "startsAt",
  "endsAt",
  "usageLimit",
  "usageLimitPerUser",
  "usedCount",
  "isActive",
  "minOrderTotal",
  "appliesTo",
  "applicableProducts",
  "applicableCategories",
  "createdAt",
  "updatedAt",
] as const;

/**
 * Sanitize discount.
 */
export function sanitizeDiscount(
  discount: DiscountLean,
): Partial<DiscountLean> {
  const sanitizedDiscount = pickFields(
    DEFAULT_DISCOUNT_SELECT_FIELDS,
    discount,
  );

  return transformMongoId(sanitizedDiscount);
}
