import { type PaginateModel, Schema, model } from "mongoose";
import paginate from "mongoose-paginate-v2";

import {
  DISCOUNT_APPLIES_TO,
  DISCOUNT_TYPE,
} from "./constants/discount.constants.js";

import type { Discount } from "./types/discount.types.js";

import {
  COLLECTION_NAME,
  DOCUMENT_NAME,
} from "../../shared/constants/model.constants.js";
import { ProductType } from "../product/constants/product.constants.js";

export const DiscountSchema = new Schema(
  {
    shop: {
      type: Schema.Types.ObjectId,
      ref: DOCUMENT_NAME.SHOP,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    /**
     * How discount is calculated.
     */
    type: {
      type: String,
      enum: Object.values(DISCOUNT_TYPE),
      required: true,
      default: DISCOUNT_TYPE.FIXED_AMOUNT,
    },
    config: {
      type: Schema.Types.Mixed,
      required: true,
    },
    code: {
      type: String,
      required: true,
      unique: true,
    },
    startsAt: {
      type: Date,
      required: true,
    },
    endsAt: {
      type: Date,
      required: true,
    },
    /**
     * Maximum allowed usages.
     */
    usageLimit: {
      type: Number,
      required: true,
    },
    usageLimitPerUser: {
      // Usage limit per user for this discount.
      type: Number,
      required: true,
    },
    usedCount: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    minOrderTotal: {
      type: Number,
      default: null,
    },
    /**
     * List of products to apply this discount.
     */
    appliesTo: {
      type: String,
      enum: Object.values(DISCOUNT_APPLIES_TO),
      default: DISCOUNT_APPLIES_TO.ALL,
    },
    applicableProducts: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: DOCUMENT_NAME.PRODUCT,
        },
      ],
      default: [],
    },
    applicableCategories: {
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
