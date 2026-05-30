export type RegisterShopInput = {
  userId: string;
  name: string;
  slug?: string;
  description?: string;
};

export type QueueShopVerificationEmailInput = {
  userId: string;
  shopId: string;
};

export type UpdateShopInput = {
  shopId: string;
  name?: string;
  slug?: string;
  description?: string;
};
