export type BaseJob = {
  notificationId: string;
};

export type AccessSendVerificationEmailJob = BaseJob & {
  userId: string;
  email: string;
  name: string;
};

export type ShopSendVerificationEmailJob = BaseJob & {
  userInfo: {
    userId: string;
    name: string;
    email: string;
  };
  shopInfo: {
    shopId: string;
    name: string;
  };
};
