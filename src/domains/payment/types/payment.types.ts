import { PAYMENT_METHOD, PAYMENT_PROVIDER } from "../payment.constants.js";

export type PaymentProviderName =
  (typeof PAYMENT_PROVIDER)[keyof typeof PAYMENT_PROVIDER];

export type PaymentMethod =
  (typeof PAYMENT_METHOD)[keyof typeof PAYMENT_METHOD];
