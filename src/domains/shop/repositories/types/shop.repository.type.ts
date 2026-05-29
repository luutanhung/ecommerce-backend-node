import type { QueryFilter } from "mongoose";

import type { Shop, ShopStatus } from "../../types/shop.type.js";

export type ShopFilterQuery = QueryFilter<Shop>;

export type FindShopRepositoryInput = {
  query?: ShopFilterQuery;
};

export type CreateShopInput = {
  userId: string;
  name: string;
  slug?: string;
  logo?: string;
  status?: ShopStatus;
};
