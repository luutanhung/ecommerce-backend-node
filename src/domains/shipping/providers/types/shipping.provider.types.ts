import type { Address } from "../../types/address.types.js";

export type ShippingAddressInput = Omit<Address, "addressLine">;

export type CalculateShippingFeeInput = {
  origin: ShippingAddressInput;
  destination: ShippingAddressInput;
  weight: number;
};

export type CalculateShippingFeeResult = {
  total: number;
};
