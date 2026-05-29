import type { QueryFilter, UpdateQuery } from "mongoose";

import type {
  SelectFields,
  SortOptions,
} from "../../../../shared/types/common.type.js";
import type { PartialPaginationQuery } from "../../../../shared/validations/pagination.validations.js";
import type { Product } from "../../types/product.type.js";

export type ProductFilterQuery = QueryFilter<Product>;
export type ProductUpdateQuery = UpdateQuery<Product>;

/**
 * Creation operations.
 */
export type CreateProductInput = {
  userId: string;
  shopId: string;
  name: string;
  thumb: string;
  price: number;
  quantity: number;
  categoryId?: string;
  description?: string;
  attributes?: Record<string, unknown>;
  images?: string[];
  isPublished?: boolean;
  slug?: string;
};

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
