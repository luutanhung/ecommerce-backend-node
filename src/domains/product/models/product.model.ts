import { Schema, model } from "mongoose";
import type { PaginateModel } from "mongoose";
import paginate from "mongoose-paginate-v2";
import slugify from "slugify";

import { ProductType } from "../constants/product.constants.js";

import type { Product } from "../types/product.type.js";

import {
  CollectionName,
  DocumentName,
} from "../../../constants/model.constants.js";
import { ResCode } from "../../../constants/resCode.constants.js";
import { CURRENCY } from "../../../pricing/constants/currency.constants.js";

export const ProductSchema = new Schema(
  {
    productOwner: {
      type: Schema.Types.ObjectId,
      ref: DocumentName.USER,
      required: true,
    },
    productShop: {
      type: Schema.Types.ObjectId,
      ref: DocumentName.SHOP,
      required: true,
    },
    productName: {
      type: String,
      required: true,
    },
    productThumb: {
      type: String,
      required: true,
    },
    productType: {
      type: String,
      required: true,
      enum: Object.values(ProductType),
    },
    productAttributes: {
      type: Schema.Types.Mixed,
      required: true,
    },
    productPrice: {
      type: Number,
      required: true,
    },
    productCurrency: {
      type: String,
      default: CURRENCY.USD,
    },
    productQuantity: {
      type: Number,
      required: true,
    },
    productDescription: {
      type: String,
    },
    productSlug: {
      type: String,
    },
    productAverageRating: {
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
    productVariations: {
      type: Array,
      default: [],
    },
    isDraft: {
      type: Boolean,
      default: true,
      index: true,
    },
    isPublished: {
      type: Boolean,
      default: false,
      index: true,
    },
  },
  {
    collection: CollectionName.PRODUCTS,
    timestamps: true,
  },
);

ProductSchema.plugin(paginate);

/**
 * Create indexes.
 */
ProductSchema.index({ productName: "text", productDescription: "text" });

/**
 * Document Middlewares.
 */
ProductSchema.pre("save", async function () {
  this.productSlug = slugify(this.productName, {
    lower: true,
  });
});

export const Products = model<Product, PaginateModel<Product>>(
  DocumentName.PRODUCT,
  ProductSchema,
);
