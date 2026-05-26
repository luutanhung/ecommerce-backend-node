import { Schema, model } from "mongoose";

import {
  COLLECTION_NAME,
  DOCUMENT_NAME,
} from "../../../constants/model.constants.js";

export const ClothingAttributesSchema = new Schema(
  {
    productShop: {
      type: Schema.Types.ObjectId,
      ref: DOCUMENT_NAME.SHOP,
    },
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
    collection: COLLECTION_NAME.CLOTHES,
    timestamps: true,
  },
);

export const Clothes = model(DOCUMENT_NAME.CLOTHING, ClothingAttributesSchema);
