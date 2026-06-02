export const PAYMENT_STATUS = {
  PENDING: "pending",

  // Customer cancels order before paying.
  EXPIRED: "expired",

  PAID: "paid",

  // customer attempted but failed.
  FAILED: "failed",

  // Seller rejected unpaid order.
  CANCELLED: "cancelled",

  REFUNDED: "refunded",

  PARTIALLY_REFUNDED: "partially_refunded",
} as const;

export enum PAYMENT_PROVIDER {
  VNPAY = "vnpay",
  STRIPE = "stripe",
}
