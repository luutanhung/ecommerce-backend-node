import { Schema, model } from "mongoose";

import {
  COLLECTION_NAME,
  DOCUMENT_NAME,
} from "../../../shared/constants/model.constants.js";
import { CART_STATE } from "../cart.contants.js";

const CartItemSchema = new Schema(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: DOCUMENT_NAME.PRODUCT,
      required: true,
    },
    shop: {
      type: Schema.Types.ObjectId,
      ref: DOCUMENT_NAME.SHOP,
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
      min: 1,
      default: 1,
    },

    name: {
      type: String,
      trim: true,
    },

    price: {
      type: Number,
      min: 0,
    },
  },
  {
    _id: false,
  },
);

export const CartSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: DOCUMENT_NAME.USER,
      required: true,
    },
    items: {
      type: [CartItemSchema],
      required: true,
      default: [],
    },
    itemCount: {
      type: Number,
      required: true,
      default: 0,
    },
    state: {
      type: String,
      enum: Object.values(CART_STATE),
      default: CART_STATE.ACTIVE,
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME.CARTS,
  },
);

export const Carts = model(DOCUMENT_NAME.CART, CartSchema);
