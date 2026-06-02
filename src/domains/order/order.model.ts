import { Schema, model } from "mongoose";

import { CURRENCY } from "../../pricing/constants/currency.constants.js";
import {
  COLLECTION_NAME,
  DOCUMENT_NAME,
} from "../../shared/constants/model.constants.js";
import {
  PAYMENT_METHOD,
  PAYMENT_STATUS,
} from "../payment/payment.constants.js";

import { ORDER_STATUS } from "./order.constants.js";
import { generateOrderNumber } from "./order.utils.js";

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

export const OrderPricingSchema = new Schema(
  {
    currency: {
      type: String,
      enum: Object.values(CURRENCY),
      required: true,
    },
    merchandiseSubtotal: {
      type: Number,
      required: true,
    },
    discountSubtotal: {
      type: Number,
      required: true,
    },
    shippingSubtotal: {
      type: Number,
      required: true,
    },
    orderTotal: {
      type: Number,
      required: true,
    },
  },
  {
    _id: false,
  },
);

export const ShippingAddressSchema = new Schema({
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
      index: true,
    },
    items: {
      type: [OrderItemSchema],
      required: true,
    },
    pricing: {
      type: OrderPricingSchema,
      required: true,
    },

    // Tracks fulfillment.
    status: {
      type: String,
      enum: Object.values(ORDER_STATUS),
      default: ORDER_STATUS.PENDING,
      index: true,
    },

    // Tracks payment.
    paymentMethod: {
      type: String,
      enum: Object.values(PAYMENT_METHOD),
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: Object.values(PAYMENT_STATUS),
      default: PAYMENT_STATUS.PENDING,
    },

    // Tracks shipment.
    shippingAddress: {
      type: ShippingAddressSchema,
      required: true,
    },
    shipment: {
      type: Schema.Types.ObjectId,
      ref: DOCUMENT_NAME.SHIPMENT,
    },

    description: {
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

OrderSchema.pre("validate", function () {
  if (this.orderNumber) {
    this.orderNumber = generateOrderNumber();
  }
});

export const Orders = model(DOCUMENT_NAME.ORDER, OrderSchema);
