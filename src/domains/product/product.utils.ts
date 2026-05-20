import type { ProductFilterQuery } from "./types/product.repository.type.js";
import type { ProductFilters } from "./types/product.service.type.js";

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
