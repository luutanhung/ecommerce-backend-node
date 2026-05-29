import type { InferSchemaType, Types } from "mongoose";
import type { HydratedDocument } from "mongoose";

import { DISCOUNT_TYPE } from "../constants/discount.constants.js";
import { DISCOUNT_APPLIES_TO } from "../constants/discount.constants.js";

import { DiscountSchema } from "../discount.model.js";

export type DiscountType = (typeof DISCOUNT_TYPE)[keyof typeof DISCOUNT_TYPE];
export type DiscountAppliesTo =
  (typeof DISCOUNT_APPLIES_TO)[keyof typeof DISCOUNT_APPLIES_TO];

export type Discount = InferSchemaType<typeof DiscountSchema>;
export type DiscountDocument = HydratedDocument<Discount>;
export type DiscountLean = Discount & {
  _id: Types.ObjectId;
};

export type PercentageDiscountConfig = {
  percent: number;
  maxDiscountAmount?: number;
};

export type FixedAmountDiscountConfig = {
  amount: number;
};
