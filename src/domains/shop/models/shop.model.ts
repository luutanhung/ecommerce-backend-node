import { Schema, model } from "mongoose";
import slugify from "slugify";

import { SHOP_STATUS } from "../constants/shop.constants.js";

import {
  COLLECTION_NAME,
  DOCUMENT_NAME,
} from "../../../shared/constants/model.constants.js";

export const ShopSchema = new Schema(
  {
    shopUser: {
      type: Schema.Types.ObjectId,
      ref: DOCUMENT_NAME.USER,
      required: true,
      index: true,
    },
    shopName: {
      type: String,
      required: true,
      trim: true,
      maxLength: 150,
    },
    shopSlug: {
      type: String,
      unique: true,
    },
    shopDescription: {
      type: String,
      default: "",
    },
    shopLogo: {
      type: String,
    },
    shopStatus: {
      type: String,
      enum: Object.values(SHOP_STATUS),
      default: SHOP_STATUS.INACTIVE,
    },
    isVerified: {
      type: Schema.Types.Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME.SHOPS,
  },
);

ShopSchema.pre("save", function () {
  this.shopSlug = slugify(this.shopName, {
    lower: true,
  });
});

export const Shops = model(DOCUMENT_NAME.SHOP, ShopSchema);
