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
