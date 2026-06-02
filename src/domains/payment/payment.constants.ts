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

export const PAYMENT_PROVIDER = {
  VNPAY: "vnpay",
  STRIPE: "stripe",
  ZALOPAY: "zalopay",
  COD: "cod",
} as const;

export const PAYMENT_METHOD = {
  CARD: "card",
  BANK_TRANSFER: "bank_transfer",

  COD: "cod",
  ZALOPAY_WALLET: "zalopay_wallet",

  VNPAY_QR: "vnpay_qr",
  VNPAY_ATM: "vnpay_atm",
} as const;
