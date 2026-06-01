/**
Order Status              Payment Status

PENDING      <--------->  PENDING
PENDING_FULFILLIMENT      <--------->  PAID

CONFIRMED    <--------->  PAID
PROCESSING   <--------->  PAID
SHIPPING     <--------->  PAID
DELIVERED    <--------->  PAID

CANCELLED    <--------->  CANCELLED
REFUNDED     <--------->  REFUNDED
 */

export const ORDER_STATUS = {
  PENDING: "pending",
  PENDING_FULFILLMENT: "PENDING_FULFILLMENT",

  CONFIRMED: "confirmed",
  PROCESSING: "processing",
  SHIPPING: "shipping",
  DELIVERED: "delivered",

  CANCELLED: "cancelled",
  REFUNDED: "refunded",
} as const;
