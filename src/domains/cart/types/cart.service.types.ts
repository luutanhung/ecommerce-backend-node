export type CartItem = {
  productId: string;
  shopId: string;
  quantity: number;
  name?: string;
  price?: number;
};

export type CreateCartInput = {
  userId: string;
};

export type AddProductToCartInput = {
  userId: string;
  product: CartItem;
};

export type UpdateCartItemQuantityInput = {
  userId: string;
  product: CartItem;
};
