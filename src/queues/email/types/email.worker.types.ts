import type { BaseJob } from "../../../shared/types/job.types.js";

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
