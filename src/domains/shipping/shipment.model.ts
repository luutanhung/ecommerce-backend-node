import { Schema, model } from "mongoose";

import {
  COLLECTION_NAME,
  DOCUMENT_NAME,
} from "../../shared/constants/model.constants.js";

import { SHIPPING_PROVIDER, SHIPPING_STATUS } from "./shipping.constants.js";

export const ShipmentSchema = new Schema(
  {
    order: {
      type: Schema.Types.ObjectId,
      ref: DOCUMENT_NAME.ORDER,
      required: true,
    },
    providerName: {
      type: String,
      enum: Object.values(SHIPPING_PROVIDER),
      required: true,
    },
    providerShipmentId: {
      type: String,
      required: true,
    },
    trackingCode: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(SHIPPING_STATUS),
    },
    metadata: {
      type: Schema.Types.Mixed,
      default: {},
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME.SHIPMENTS,
  },
);

export const Shipments = model(DOCUMENT_NAME.SHIPMENT, ShipmentSchema);
