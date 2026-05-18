import { Schema, model } from "mongoose";

import { ProductType } from "../../domains/product/product.constants.js";

const DOCUMENT_NAME: string = "Product";
const COLLECTION_NAME: string = "Products";

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
    productDescription: {
      type: String,
    },
    productPrice: {
      type: Number,
      required: true,
    },
    productQuantity: {
      type: Number,
      required: true,
    },
    productType: {
      type: String,
      required: true,
      enum: Object.values(ProductType),
    },
    productShop: {
      type: Schema.Types.ObjectId,
      ref: "Shop",
    },
    productAttributes: {
      type: Schema.Types.Mixed,
      required: true,
    },
  },
  {
    collection: COLLECTION_NAME,
    timestamps: true,
  },
);

export const Products = model(DOCUMENT_NAME, ProductSchema);
