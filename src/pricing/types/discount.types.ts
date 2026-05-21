import { DISCOUNT_TYPE } from "../constants/discount.constants.js";
import { DISCOUNT_APPLIES_TO } from "../constants/discount.constants.js";

export type DiscountType = (typeof DISCOUNT_TYPE)[keyof typeof DISCOUNT_TYPE];
export type DiscountAppliesTo =
  (typeof DISCOUNT_APPLIES_TO)[keyof typeof DISCOUNT_APPLIES_TO];
