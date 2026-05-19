import { Schema, model } from "mongoose";

import {
  CollectionName,
  DocumentName,
} from "../../../constants/model.constants.js";

export const ClothingAttributesSchema = new Schema(
  {
    productShop: {
      type: Schema.Types.ObjectId,
      ref: DocumentName.SHOP,
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
    collection: CollectionName.CLOTHES,
    timestamps: true,
  },
);

export const Clothes = model(DocumentName.CLOTHING, ClothingAttributesSchema);
