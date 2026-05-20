import type { SortOptions } from "../../../shared/validations/common.validations.js";
import type { PartialPaginationQuery } from "../../../shared/validations/pagination.validations.js";

import type { ProductDocument } from "./product.type.js";

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

export type FindPublishedProductsInput = PartialPaginationQuery & SortOptions;
