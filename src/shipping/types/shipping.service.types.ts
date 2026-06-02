export type CalculateShippingFeeInput = {
  fromDistrictId: number;
  toDistrictId: number;

  weight: number;
  length: number;
  width: number;
  height: number;

  insuranceValue: number;
};

export type ShippingQuote = {
  provider: string;

  serviceId: number;

  fee: number;

  estimatedDeliveryDate?: Date;
};
