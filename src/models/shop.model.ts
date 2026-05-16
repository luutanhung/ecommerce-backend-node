import { type InferSchemaType, Schema, model } from "mongoose";

import { ShopStatus } from "../constants/shop.constant.js";

const DOCUMENT_NAME = "Shop";
const COLLECTION_NAME = "Shops";

const shopSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      maxLength: 150,
    },
    email: {
      type: String,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(ShopStatus),
      default: ShopStatus.INACTIVE,
    },
    verify: {
      type: Schema.Types.Boolean,
      default: false,
    },
    roles: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  },
);

export type ShopDocument = InferSchemaType<typeof shopSchema>;

export const Shops = model(DOCUMENT_NAME, shopSchema);
