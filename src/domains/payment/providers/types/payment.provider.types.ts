export type CreatePaymentInput = {
  orderId: string;
  orderNumber: string;
  amount: number;
  currency: string;
  description: string;
  ipAddress?: string;
};

export type CreatePaymentResult = {
  providerPaymentId: string;
  paymentUrl?: string;
  clientSecret?: string;
  expiresAt?: Date;
};

// eslint-disable-next-line
export type VerifyPaymentResultInput = {};

export type VerifyPaymentResult = {
  success: boolean;

  providerPaymentId: string;

  transactionId?: string;

  amount?: number;

  raw?: unknown;
};

// eslint-disable-next-line
export type RefundPaymentInput = {};
