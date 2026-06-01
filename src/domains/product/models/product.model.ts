import { Schema, model } from "mongoose";
import type { PaginateModel } from "mongoose";
import paginate from "mongoose-paginate-v2";
import slugify from "slugify";

import type { Product } from "../types/product.types.js";

import {
  COLLECTION_NAME,
  DOCUMENT_NAME,
} from "../../../shared/constants/model.constants.js";
import { ResCode } from "../../../shared/constants/resCode.constants.js";

export const ProductSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: DOCUMENT_NAME.USER,
      required: true,
    },
    shop: {
      type: Schema.Types.ObjectId,
      ref: DOCUMENT_NAME.SHOP,
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: DOCUMENT_NAME.CATEGORY,
    },
    name: {
      type: String,
      required: true,
    },
    thumb: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
    },
    slug: {
      type: String,
    },
    averageRating: {
      type: Number,
      default: 4.5,
      min: [
        1,
        ResCode.PRODUCT_AVERAGE_RATING_MUST_BE_GREATER_THAN_OR_EQUAL_TO_ONE,
      ],
      max: [
        5,
        ResCode.PRODUCT_AVERAGE_RATING_MUST_BE_LESS_THAN_OR_EQUAL_TO_FIVE,
      ],
      set: (averageRating: number) => averageRating.toFixed(1),
    },

    /**
     * Dynamic attributes.
     */
    attributes: {
      type: Schema.Types.Mixed,
      default: {},
    },
    images: {
      type: [String],
      default: [],
    },
    isPublished: {
      type: Boolean,
      default: false,
      index: true,
    },
  },
  {
    collection: COLLECTION_NAME.PRODUCTS,
    timestamps: true,
  },
);

ProductSchema.plugin(paginate);

/**
 * Create indexes.
 */
ProductSchema.index({ name: "text", description: "text" });

/**
 * Document Middlewares.
 */
ProductSchema.pre("save", async function () {
  this.slug = slugify(this.name, {
    lower: true,
  });
});

export const Products = model<Product, PaginateModel<Product>>(
  DOCUMENT_NAME.PRODUCT,
  ProductSchema,
);
