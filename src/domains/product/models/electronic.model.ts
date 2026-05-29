import { Schema, model } from "mongoose";

import {
  COLLECTION_NAME,
  DOCUMENT_NAME,
} from "../../../shared/constants/model.constants.js";

export const ElectronicAttributesSchema = new Schema(
  {
    productShop: {
      type: Schema.Types.ObjectId,
      ref: DOCUMENT_NAME.SHOP,
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
    collection: COLLECTION_NAME.ELECTRONICS,
    timestamps: true,
  },
);

export const Electronics = model(
  DOCUMENT_NAME.ELECTRONIC,
  ElectronicAttributesSchema,
);
