import { Schema, model } from "mongoose";

import { ProductType } from "../constants/product.constant.js";

const DOCUMENT_NAME: string = "Product";
const COLLECTION_NAME: string = "Products";

export const productSchema = new Schema(
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

export const electronicAttributesSchema = new Schema(
  {
    manufacturer: {
      type: String,
      required: true,
    },
    model: {
      type: String,
    },
    color: {
      type: String,
    },
  },
  {
    collection: "Electronics",
    timestamps: true,
  },
);

export const clothingAttributesSchema = new Schema(
  {
    brand: {
      type: String,
      required: true,
    },
    size: {
      type: String,
    },
    material: {
      type: String,
    },
  },
  {
    collection: "clothes",
    timestamps: true,
  },
);

export const Products = model(DOCUMENT_NAME, productSchema);
export const EletronicAttributes = model(
  "Eletronic",
  electronicAttributesSchema,
);
export const ClothingAttributes = model("Clothe", clothingAttributesSchema);
