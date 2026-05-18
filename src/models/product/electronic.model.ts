import { Schema, model } from "mongoose";

const DOCUMENT_NAME: string = "Eletronic";
const COLLECTION_NAME: string = "Electronics";

export const ElectronicAttributesSchema = new Schema(
  {
    productShop: {
      type: Schema.Types.ObjectId,
      required: true,
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
    collection: COLLECTION_NAME,
    timestamps: true,
  },
);

export const Electronics = model(DOCUMENT_NAME, ElectronicAttributesSchema);
