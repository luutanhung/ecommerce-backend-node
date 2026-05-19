import type {
  ProductDocument,
  ProductLean,
} from "../../product/product.type.js";

export type CreateProductResult = ProductDocument;

export type PublishProductInput = {
  shopId: string;
  productId: string;
};

export type FindProductsByShopIdInput = {
  shopId: string;
  limit?: number;
  skip?: number;
};

export type FindProductsByShopIdResult = ProductLean[];
