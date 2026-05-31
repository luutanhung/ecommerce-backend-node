export type OrderItem = {
  productId: string;
  name: string;
  thumb: string;
  price: number;
  quantity: number;
  subtotal: number;
};

export type ShopOrderInput = {
  shopId: string;
  discountCodes: string[];
  items: OrderItemInput[];
};

export type OrderItemInput = {
  productId: string;
  quantity: number;
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
  shopOrders: {
    shopId: string;
    items: OrderItem[];
  }[];
};
