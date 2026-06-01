export type CreatePaymentInput = {
  orderId: string;
  orderNumber: string;
  amount: number;
  currency: string;
  description: string;
  successUrl: string;
  cancelUrl: string;
};

export type CreatePaymentResult = {
  providerPaymentId: string;
  paymentUrl?: string;
  clientSecret?: string;
  expiresAt?: Date;
};

export type VerifyPaymentInput = {
  body: string;
  signature: string;
};

export type VerifyPaymentResult = {
  success: boolean;

  providerPaymentId: string;

  transactionId?: string;

  amount?: number;

  raw?: unknown;
};

// eslint-disable-next-line
export type RefundPaymentInput = {};
