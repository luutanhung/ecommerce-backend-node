import { type PaginateModel, Schema, model } from "mongoose";
import paginate from "mongoose-paginate-v2";

import {
  COLLECTION_NAME,
  DOCUMENT_NAME,
} from "../shared/constants/model.constants.js";

import { ProductType } from "../domains/product/constants/product.constants.js";

import {
  DISCOUNT_APPLIES_TO,
  DISCOUNT_TYPE,
} from "./constants/discount.constants.js";

import type { Discount } from "./types/discount.types.js";

export const DiscountSchema = new Schema(
  {
    discountShop: {
      type: Schema.Types.ObjectId,
      ref: DOCUMENT_NAME.SHOP,
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
    /**
     * How discount is calculated.
     */
    discountType: {
      type: String,
      enum: Object.values(DISCOUNT_TYPE),
      required: true,
      default: DISCOUNT_TYPE.FIXED_AMOUNT,
    },
    discountConfig: {
      type: Schema.Types.Mixed,
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
    /**
     * Maximum allowed usages.
     */
    discountUsageLimit: {
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
    /**
     * List of products to apply this discount.
     */
    discountAppliesTo: {
      type: String,
      enum: Object.values(DISCOUNT_APPLIES_TO),
      default: DISCOUNT_APPLIES_TO.ALL,
    },
    discountApplicableProducts: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: DOCUMENT_NAME.PRODUCT,
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
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME.DISCOUNTS,
  },
);

DiscountSchema.plugin(paginate);

export const Discounts = model<Discount, PaginateModel<Discount>>(
  DOCUMENT_NAME.DISCOUNT,
  DiscountSchema,
);
