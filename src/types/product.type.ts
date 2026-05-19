import type {
  ProductDocument,
  ProductLean,
} from "../domains/product/product.type.js";

export type CreateProductResult = ProductDocument;

export type FindDraftProductsByShopIdInput = {
  productShop: string;
  limit?: number;
  skip?: number;
};

export type FindDraftProductsByShopIdResult = ProductLean[];
