import { DISCOUNT_TYPE } from "../constants/discount.constants.js";

export type DiscountType = (typeof DISCOUNT_TYPE)[keyof typeof DISCOUNT_TYPE];
