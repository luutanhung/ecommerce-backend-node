import type { BaseJob } from "../../../shared/types/job.types.js";

export type ShopCloseShopJob = BaseJob & {
  shopId: string;
};
