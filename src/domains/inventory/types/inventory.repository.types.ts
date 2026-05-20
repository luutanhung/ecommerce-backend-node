export type CreateInventoryRepositoryInput = {
  productId: string;
  shopId: string;
  stock: number;
  location?: string;
  reservations?: unknown[];
};
