import { Schema, model } from "mongoose";

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
      min: [1, ResCode.PRODUCT_AVERAGE_RATING_MUST_BE_POSITIVE],
    },
  },
  {
    collection: CollectionName.PRODUCTS,
    timestamps: true,
  },
);

export const Products = model(DocumentName.PRODUCT, ProductSchema);
