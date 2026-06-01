import { Schema, model } from "mongoose";

import {
  COLLECTION_NAME,
  DOCUMENT_NAME,
} from "../../shared/constants/model.constants.js";
import { PAYMENT_STATUS } from "../payment/payment.constants.js";

import { ORDER_STATUS } from "./order.constants.js";

const OrderItemSchema = new Schema(
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
    name: {
      type: String,
      required: true,
    },
    thumb: {
      type: String,
      default: "",
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    subtotal: {
      type: Number,
      required: true,
    },
  },
  {
    _id: true,
  },
);

export const OrderSummarySchema = new Schema(
  {
    merchandiseSubtotal: Number,

    discountSubtotal: Number,

    shippingSubtotal: Number,

    orderTotal: Number,
  },
  {
    _id: false,
  },
);

export const ShippingAddressSchema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  addressLine: {
    type: String,
    required: true,
  },
  ward: {
    type: String,
  },
  district: {
    type: String,
  },
  province: {
    type: String,
  },
});

export const OrderSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: DOCUMENT_NAME.USER,
      required: true,
      index: true,
    },
    orderNumber: {
      type: String,
      unique: true,
      required: true,
    },
    items: {
      type: [OrderItemSchema],
      required: true,
    },
    summary: {
      type: OrderSummarySchema,
      required: true,
    },
    shippingAddress: {
      type: ShippingAddressSchema,
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(ORDER_STATUS),
      default: ORDER_STATUS.PENDING,
      index: true,
    },
    paymentStatus: {
      type: String,
      enum: Object.values(PAYMENT_STATUS),
      default: PAYMENT_STATUS.PENDING,
    },
    note: {
      type: String,
      default: "",
    },
    paidAt: {
      type: Date,
    },
    cancelledAt: {
      type: Date,
    },
    deliveredAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME.ORDERS,
  },
);

export const orders = model(DOCUMENT_NAME.ORDER, OrderSchema);
