import { Schema, model } from "mongoose";

import {
  CollectionName,
  DocumentName,
} from "../../../constants/model.constants.js";

/**
 * Furniture schema.
 */
export const FurnitureAttributesSchema = new Schema(
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
    collection: CollectionName.FURNITURES,
    timestamps: true,
  },
);

export const Furnitures = model(
  DocumentName.FURNITURE,
  FurnitureAttributesSchema,
);
