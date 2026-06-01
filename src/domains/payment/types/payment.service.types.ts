import type { PaymentProviderName } from "./payment.types.js";

export type CreatePaymentInput = {
  orderId: string;
  providerName: PaymentProviderName;
};

export type HandleStripeWebhookInput = {
  body: string;
  signature: string;
};
