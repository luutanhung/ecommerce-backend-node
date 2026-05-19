import type { QueryFilter, UpdateQuery } from "mongoose";

import type { Product } from "./product.type.js";

export type ProductFilterQuery = QueryFilter<Product>;
export type ProductUpdateQuery = UpdateQuery<Product>;

/**
 * Modification operations.
 */
export type UpdateProductInput = {
  query: ProductFilterQuery;
  update: ProductUpdateQuery;
};

/**
 * Searching operations.
 */
export type FindProductInput = {
  query?: ProductFilterQuery;
};

export type FindProductsInput = {
  query?: ProductFilterQuery;
  limit?: number;
  skip?: number;
};
