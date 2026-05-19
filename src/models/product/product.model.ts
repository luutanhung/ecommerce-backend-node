import { Schema, model } from "mongoose";
import slugify from "slugify";

import {
  CollectionName,
  DocumentName,
} from "../../constants/model.constants.js";
import { ResCode } from "../../constants/resCode.constants.js";
import { ProductType } from "../../domains/product/product.constants.js";

export const ProductSchema = new Schema(
  {
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
    productQuantity: {
      type: Number,
      required: true,
    },
    productShop: {
      type: Schema.Types.ObjectId,
      ref: DocumentName.SHOP,
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

/**
 * Document Middlewares.
 */
ProductSchema.pre("save", async function () {
  this.productSlug = slugify(this.productName, {
    lower: true,
  });
});

export const Products = model(DocumentName.PRODUCT, ProductSchema);
