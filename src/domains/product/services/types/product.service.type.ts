import type { SortOptions } from "../../../../shared/types/common.type.js";
import type { PartialPaginationQuery } from "../../../../shared/validations/pagination.validations.js";
import type { ProductType } from "../../types/product.type.js";

/**
 * Create a new shop product.
 */
export type CreateShopProductInput = {
  userId: string;

  shopId: string;

  name: string;

  thumb: string;

  description?: string;

  /**
   * Store money in smallest unit.
   * Example:
   * 129999 = $1299.99
   */
  price: number;

  quantity: number;

  /**
   * Category determines allowed attributes.
   */
  categoryId?: string;

  /**
   * Dynamic category-specific attributes.
   *
   * Example:
   * {
   *   brand: "Nike",
   *   material: "Cotton"
   * }
   */
  attributes?: Record<string, unknown>;

  /**
   * Additional gallery images.
   */
  images?: string[];

  /**
   * Publication status.
   */
  isPublished?: boolean;

  /**
   * Optional SEO slug.
   */
  slug?: string;
};

export type PublishShopProductInput = {
  shopId: string;
  productId: string;
};

export type UnpublishedShopProductInput = PublishShopProductInput;

export type FindProductOwnedByShopInput = {
  shopId: string;
  productId: string;
};

export type FindProductsOwnedByShopInput = PartialPaginationQuery & {
  shopId: string;
};

export type SearchProductsInput = PartialPaginationQuery & {
  keyword: string;
};

export type ProductFilters = {
  productType?: ProductType;
  isPublished?: boolean;
};

export type FindPublishedProductsInput = ProductFilters &
  SortOptions &
  PartialPaginationQuery;

export type FindPublishedProductInput = {
  productId: string;
};
