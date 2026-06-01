import type { OrderLean } from "../../../order/types/order.types.js";

export type CreatePaymentUrlInput = {
  order: OrderLean;
};

// eslint-disable-next-line
export type VerifyPaymentResultInput = {};

// eslint-disable-next-line
export type RefundPaymentInput = {};
