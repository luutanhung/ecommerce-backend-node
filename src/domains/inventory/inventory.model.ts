import { Schema, model } from "mongoose";

import {
  COLLECTION_NAME,
  DOCUMENT_NAME,
} from "../../shared/constants/model.constants.js";

const InventoryReservationSchema = new Schema(
  {
    order: {
      type: Schema.Types.ObjectId,
      ref: DOCUMENT_NAME.ORDER,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
  },
  {
    _id: false,
  },
);

export const InventorySchema = new Schema(
  {
    shop: {
      type: Schema.Types.ObjectId,
      ref: DOCUMENT_NAME.SHOP,
      required: true,
    },
    product: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: DOCUMENT_NAME.PRODUCT,
    },
    stock: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
      default: "",
    },
    reservations: {
      type: [InventoryReservationSchema],
      default: [],
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME.INVENTORIES,
  },
);

export const Inventories = model(DOCUMENT_NAME.INVENTORY, InventorySchema);
