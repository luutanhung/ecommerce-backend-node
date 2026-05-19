import { Schema, model } from "mongoose";

import {
  CollectionName,
  DocumentName,
} from "../../constants/model.constants.js";
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
  },
  {
    collection: CollectionName.PRODUCTS,
    timestamps: true,
  },
);

export const Products = model(DocumentName.PRODUCT, ProductSchema);
