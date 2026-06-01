import { PAYMENT_PROVIDER } from "../payment.constants.js";

export type PaymentProviderName =
  (typeof PAYMENT_PROVIDER)[keyof typeof PAYMENT_PROVIDER];
