import { Schema, model } from "mongoose";

import { ProductType } from "../domains/product/constants/product.constants.js";

import { DocumentName } from "../constants/model.constants.js";
import {
  DISCOUNT_APPLIES_TO,
  DISCOUNT_TYPE,
} from "./constants/discount.constants.js";

export const DiscountSchema = new Schema({
  discountShop: {
    type: Schema.Types.ObjectId,
    ref: DocumentName.SHOP,
    required: true,
  },
  discountName: {
    type: String,
    required: true,
  },
  discountDescription: {
    type: String,
    required: true,
  },
  discountType: {
    type: String,
    enum: Object.values(DISCOUNT_TYPE),
    required: true,
    default: DISCOUNT_TYPE.FIXED_AMOUNT,
  },
  discountValue: {
    type: Number,
    required: true,
  },
  discountCode: {
    type: String,
    required: true,
    unique: true,
  },
  discountStartsAt: {
    type: Date,
    required: true,
  },
  discountEndsAt: {
    type: Date,
    required: true,
  },
  discountUsageLimit: {
    // Usage limit for this discount.
    type: Number,
    required: true,
  },
  discountUsageLimitPerUser: {
    // Usage limit per user for this discount.
    type: Number,
    required: true,
  },
  discountUsersUsed: {
    type: Array,
    default: [],
  },
  discountUsedCount: {
    type: Number,
    default: 0,
  },
  discountIsActive: {
    type: Boolean,
    default: true,
  },
  discountMinOrderValue: {
    type: Number,
    default: 0,
  },
  // List of products to apply this discount.
  discountAppliesTo: {
    type: String,
    enum: Object.values(DISCOUNT_APPLIES_TO),
    default: DISCOUNT_APPLIES_TO.ALL,
  },
  discountApplicableProducts: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: DocumentName.PRODUCT,
      },
    ],
    default: [],
  },
  discountApplicableCategories: {
    type: [
      {
        type: String,
        enum: Object.values(ProductType),
      },
    ],
    default: [],
  },
});

export const Discounts = model(DocumentName.DISCOUNT, DiscountSchema);
