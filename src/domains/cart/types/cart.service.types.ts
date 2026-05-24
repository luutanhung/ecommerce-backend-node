export type AddProductToCartInput = {
  userId: string;
  product: {
    productId: string;
    shopId: string;
    quantity: number;
    name?: string;
    price?: number;
  };
};
