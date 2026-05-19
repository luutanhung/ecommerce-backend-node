import type { QueryFilter } from "mongoose";

import type {
  Product,
  ProductDocument,
  ProductLean,
} from "../domains/product/product.type.js";

export type ProductQuery = QueryFilter<Product>;

export type CreateProductResult = ProductDocument;

export type FindProductsInput = {
  query?: ProductQuery;
  limit?: number;
  skip?: number;
};

export type FindProductsResult = ProductLean[];

export type FindProductsByShopIdInput = {
  shopId: string;
  limit?: number;
  skip?: number;
};

export type FindProductsByShopIdResult = ProductLean[];
