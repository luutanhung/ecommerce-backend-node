import { SHIPPING_PROVIDER } from "./shipping.constants.js";

export type ShippingProviderName =
  (typeof SHIPPING_PROVIDER)[keyof typeof SHIPPING_PROVIDER];
