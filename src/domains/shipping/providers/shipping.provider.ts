import type { CalculateShippingFeeInput } from "./types/shipping.provider.types.js";

export abstract class ShippingProvider {
  abstract calculateShippingFee(input: CalculateShippingFeeInput): void;

  // abstract createShipment(): unknown;

  // abstract cancelShipment(shipmentId: string): Promise<void>;

  // abstract trackShipment(shipmentId: string): Promise<void>;
}
