import type { QueryFilter, UpdateQuery } from "mongoose";

import type { PartialPaginationQuery } from "../../../shared/validations/pagination.validations.js";
import type { SelectFields, SortOptions } from "../../../types/common.type.js";

import type { Product } from "./product.type.js";

export type ProductFilterQuery = QueryFilter<Product>;
export type ProductUpdateQuery = UpdateQuery<Product>;

/**
 * Modification operations.
 */
export type UpdateProductRepositoryInput = {
  query: ProductFilterQuery;
  update: ProductUpdateQuery;
};

/**
 * Searching operations.
 */
export type FindProductRepositoryInput = {
  query?: ProductFilterQuery;
};

export type FindProductsRepositoryInput = Partial<SortOptions> &
  PartialPaginationQuery & {
    query?: ProductFilterQuery;
  } & SelectFields;
