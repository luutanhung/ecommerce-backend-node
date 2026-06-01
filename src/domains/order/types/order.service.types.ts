export type OrderItem = {
  productId: string;
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

export type CheckoutSummary = {
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
};
