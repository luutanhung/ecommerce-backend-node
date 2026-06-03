import { Schema, model } from "mongoose";
import slugify from "slugify";

import { SHOP_STATUS } from "../constants/shop.constants.js";

import {
  COLLECTION_NAME,
  DOCUMENT_NAME,
} from "../../../shared/constants/model.constants.js";
import { CURRENCY } from "../../pricing/constants/currency.constants.js";

export const ShopAddressSchema = new Schema(
  {
    province: {
      type: String,
      required: true,
    },
    district: {
      type: String,
      required: true,
    },
    ward: {
      type: String,
      required: true,
    },
    addressLine: {
      type: String,
      required: true,
    },
  },
  {
    _id: false,
  },
);

export const ShopSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: DOCUMENT_NAME.USER,
      required: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      maxLength: 150,
    },
    currency: {
      type: String,
      enum: Object.values(CURRENCY),
      required: true,
    },
    slug: {
      type: String,
      unique: true,
    },
    description: {
      type: String,
      default: "",
    },
    logo: {
      type: String,
    },
    status: {
      type: String,
      enum: Object.values(SHOP_STATUS),
      default: SHOP_STATUS.ACTIVE,
    },
    isVerified: {
      type: Schema.Types.Boolean,
      default: false,
    },
    closedAt: {
      type: Date,
      default: null,
    },
    address: {
      type: ShopAddressSchema,
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME.SHOPS,
  },
);

ShopSchema.pre("save", function () {
  this.slug = slugify(this.name, {
    lower: true,
  });
});

export const Shops = model(DOCUMENT_NAME.SHOP, ShopSchema);
