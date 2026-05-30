export type RegisterShopInput = {
  userId: string;
  name: string;
  slug?: string;
  description?: string;
};

export type QueueShopVerificationEmailInput = {
  userInfo: {
    userId: string;
    email: string;
    name: string;
  };
  shopInfo: {
    shopId: string;
    name: string;
  };
};

export type VerifyShopInput = {
  token: string;
};

export type UpdateShopInput = {
  shopId: string;
  name?: string;
  slug?: string;
  description?: string;
};

export type CloseShopInput = {
  shopId: string;
};

export type PerformShopClosureInput = {
  shopId: string;
};
