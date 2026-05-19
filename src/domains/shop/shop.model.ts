import { Schema, model } from "mongoose";

import {
  CollectionName,
  DocumentName,
} from "../../constants/model.constants.js";

import { ShopStatus } from "./shop.constants.js";

export const ShopSchema = new Schema(
  {
    shopOwner: {
      type: Schema.Types.ObjectId,
      ref: DocumentName.USER,
      required: true,
      index: true,
    },
    shopName: {
      type: String,
      trim: true,
      maxLength: 150,
    },
    shopSlug: {
      type: String,
      unique: true,
      required: true,
    },
    shopLogo: {
      type: String,
    },
    shopStatus: {
      type: String,
      enum: Object.values(ShopStatus),
      default: ShopStatus.INACTIVE,
    },
    isVerified: {
      type: Schema.Types.Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    collection: CollectionName.SHOPS,
  },
);

export const Shops = model(DocumentName.SHOP, ShopSchema);
