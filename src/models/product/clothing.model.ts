import { Schema, model } from "mongoose";

const DOCUMENT_NAME: string = "Clothing";
const COLLECTION_NAME: string = "Clothes";

export const ClothingAttributesSchema = new Schema(
  {
    productShop: {
      type: Schema.Types.ObjectId,
      required: true,
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
    collection: COLLECTION_NAME,
    timestamps: true,
  },
);

export const Clothes = model(DOCUMENT_NAME, ClothingAttributesSchema);
