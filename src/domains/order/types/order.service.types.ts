import type { Currency } from "../../../pricing/types/currency.types.js";

export type OrderItem = {
  productId: string;
  shopId: string;
  name: string;
  thumb: string;
  price: number;
  quantity: number;
  subtotal: number;
};

// ==========================================
// Service Inputs.
// ==========================================

export type OrderItemInput = {
  productId: string;
  quantity: number;
  price: number;
};

export type ShopOrderInput = {
  shopId: string;
  discountCode: string;
  items: OrderItemInput[];
};

export type CheckoutOrderInput = {
  userId: string;
  cartId: string;
  shopOrders: ShopOrderInput[];
};

export type ShopCheckoutSummary = {
  shopId: string;
  totalProductPrice: number;
  totalDiscountAmount: number;
  totalShippingFee: number;
  checkoutPrice: number;
};

export type OrderSummary = {
  currency: Currency;
  merchandiseSubtotal: number;
  discountSubtotal: number;
  shippingSubtotal: number;
  orderTotal: number;
};

export type ShopOrders = {
  shopId: string;
  items: OrderItem[];
}[];

export type CreateOrderInput = {
  userId: string;
  cartId: string;
  shopOrders: ShopOrderInput[];
  shippingAddress?: OrderShippingAddress;
};

export type OrderShippingAddress = {
  addressLine: string;
  ward?: string;
  district?: string;
  province?: string;
};

export type CreatePendingOrderInput = {
  userId: string;
  orderItems: OrderItem[];
  orderSummary: OrderSummary;
  orderShippingAddress?: OrderShippingAddress & {
    phoneNumber: string;
  };
};
