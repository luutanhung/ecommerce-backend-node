import type { Address } from "../../types/address.types.js";

export type CalculateShippingFeeInput = {
  originInfo: Address;
  destinationInfo: Address;
  weight: number;
};
