import type { Currency } from "../../../../pricing/types/currency.types.js";
import type { PaymentMethod } from "../../types/payment.types.js";

export type createPaymentForOrderInput = {
  orderId: string;
  method: PaymentMethod;
  orderNumber: string;
  amount: number;
  currency: Currency;
  description: string;
  successUrl: string;
  cancelUrl: string;
};

export type CreatePaymentForOrderResult = {
  providerPaymentId: string;
  paymentUrl: string;
  clientSecret?: string;
  expiresAt?: Date;
};

export type VerifyPaymentInput = {
  body: string;
  signature: string;
};

export type ConstructWebhookEventInput = {
  body: string;
  signature: string;
};

export type VerifyPaymentResult = {
  success: boolean;

  providerPaymentId: string;

  transactionId?: string;

  amount?: number;

  raw?: unknown;
};

// eslint-disable-next-line
export type RefundPaymentInput = {};
