export const PAYMENT_STATUS = {
  PENDING: "pending",
  PAID: "paid",
  FAILED: "failed",
  CANCELLED: "cancelled",
  REFUNDED: "refunded",
} as const;

export enum PAYMENT_PROVIDER {
  VNPAY = "vnpay",
  STRIPE = "stripe",
  MOMO = "momo",
}
