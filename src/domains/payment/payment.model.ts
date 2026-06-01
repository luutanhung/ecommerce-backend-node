import { Schema, model } from "mongoose";

import {
  COLLECTION_NAME,
  DOCUMENT_NAME,
} from "../../shared/constants/model.constants.js";

import { PAYMENT_PROVIDER, PAYMENT_STATUS } from "./payment.constants.js";

export const PaymentSchema = new Schema(
  {
    order: {
      type: Schema.Types.ObjectId,
      ref: DOCUMENT_NAME.ORDER,
      required: true,
    },
    provider: {
      type: String,
      enum: Object.values(PAYMENT_PROVIDER),
      required: true,
    },
    providerPaymentId: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(PAYMENT_STATUS),
      default: PAYMENT_STATUS.PENDING,
    },
    transactionId: String,
    metadata: {
      type: Schema.Types.Mixed,
      default: {},
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME.PAYMENTS,
  },
);

export const Payments = model(DOCUMENT_NAME.PAYMENT, PaymentSchema);
