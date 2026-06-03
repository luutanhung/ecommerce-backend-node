export type ShippingQuote = {
  provider: string;

  serviceId: number;

  fee: number;

  estimatedDeliveryDate?: Date;
};
