import { Schema, model } from "mongoose";

import {
  COLLECTION_NAME,
  DOCUMENT_NAME,
} from "../../../constants/model.constants.js";

/**
 * Furniture schema.
 */
export const FurnitureAttributesSchema = new Schema(
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
    collection: COLLECTION_NAME.FURNITURES,
    timestamps: true,
  },
);

export const Furnitures = model(
  DOCUMENT_NAME.FURNITURE,
  FurnitureAttributesSchema,
);
