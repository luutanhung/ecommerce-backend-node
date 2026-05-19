import { Schema, model } from "mongoose";

import {
  CollectionName,
  DocumentName,
} from "../../../constants/model.constants.js";

export const ElectronicAttributesSchema = new Schema(
  {
    productShop: {
      type: Schema.Types.ObjectId,
      ref: DocumentName.SHOP,
    },
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
    collection: CollectionName.ELECTRONICS,
    timestamps: true,
  },
);

export const Electronics = model(
  DocumentName.ELECTRONIC,
  ElectronicAttributesSchema,
);
