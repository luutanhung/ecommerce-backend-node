export type RegisterShopInput = {
  userId: string;
  name: string;
  slug?: string;
  description?: string;
};

export type UpdateShopInput = {
  shopId: string;
  name?: string;
  slug?: string;
  description?: string;
};
