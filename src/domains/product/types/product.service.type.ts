import type { PartialPaginationQuery } from "../../../shared/validations/pagination.validations.js";
import type { SortOptions } from "../../../types/common.type.js";

import type { ProductDocument, ProductType } from "./product.type.js";

export type CreateProductResult = ProductDocument;

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
