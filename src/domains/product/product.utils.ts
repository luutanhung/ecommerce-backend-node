import type { ProductFilters } from "./services/types/product.service.type.js";

import type { ProductFilterQuery } from "./repositories/types/product.repository.type.js";

/**
 * Build query to support searching products.
 */
export function buildProductsQuery(
  filters: ProductFilters,
): ProductFilterQuery {
  return {
    ...(filters.productType && {
      productType: filters.productType,
    }),
    ...(filters.isPublished && {
      isPublished: filters.isPublished,
    }),
  };
}
