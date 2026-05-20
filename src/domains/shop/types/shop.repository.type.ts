import type { QueryFilter } from "mongoose";

import type { Shop } from "./shop.type.js";

export type ShopFilterQuery = QueryFilter<Shop>;

export type FindShopRepositoryInput = {
  query?: ShopFilterQuery;
};
