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
      ref: "Shop",
    },
    productDescription: {
      type: String,
    },
  },
  {
    collection: COLLECTION_NAME,
    timestamps: true,
  },
);

export const Products = model(DOCUMENT_NAME, ProductSchema);
