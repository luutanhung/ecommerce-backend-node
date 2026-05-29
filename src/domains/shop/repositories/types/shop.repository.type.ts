import type { QueryFilter } from "mongoose";

import type { Shop, ShopStatus } from "../../types/shop.types.js";

export type ShopFilterQuery = QueryFilter<Shop>;

export type FindShopRepositoryInput = {
  query?: ShopFilterQuery;
};

export type CreateShopInput = {
  userId: string;
  name: string;
  description?: string;
  slug?: string;
  logo?: string;
  status?: ShopStatus;
};
