import { Schema, model } from "mongoose";

import { ShopStatus } from "../domains/shop/shop.constants.js";

import { CollectionName, DocumentName } from "../constants/model.constants.js";

export const ShopSchema = new Schema(
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
    collection: CollectionName.SHOPS,
  },
);

export const Shops = model(DocumentName.SHOP, ShopSchema);
