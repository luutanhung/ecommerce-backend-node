import type { PaymentMethod, PaymentProviderName } from "./payment.types.js";

export type createPaymentForOrderInput = {
  orderId: string;
  paymentProviderName: PaymentProviderName;
  paymentMethod: PaymentMethod;
};

export type HandleStripeWebhookInput = {
  body: string;
  signature: string;
};
