import type { ProductDocument } from "../../product/product.type.js";

export type CreateProductResult = ProductDocument;

export type PublishProductInput = {
  shopId: string;
  productId: string;
};

export type UnpublishedProductInput = PublishProductInput;

export type FindProductInput = {
  shopId: string;
  productId: string;
};

export type FindProductsByShopIdInput = {
  shopId: string;
  limit?: number;
  skip?: number;
};
