import { ProductFactory } from "../domains/product/product.factory.js";
import { ProductRepository } from "../domains/product/product.repository.js";
import type { CreateProductFactoryInput } from "../domains/product/product.type.js";

import {
  DEFAULT_PRODUCT_LIMIT,
  DEFAULT_PRODUCT_SKIP,
} from "../constants/pagination.constants.js";

import type {
  CreateProductResult,
  FindProductsByShopIdInput,
  FindProductsByShopIdResult,
  ProductQuery,
} from "../types/product.type.js";

export class ProductService {
  /**
   * Create a new product.
   */
  static createProduct = async (
    createProductFactoryInput: CreateProductFactoryInput,
  ): Promise<CreateProductResult> => {
    return await ProductFactory.createProduct(createProductFactoryInput);
  };

  /**
   * Find all draft products by shop.
   */
  static findDraftProductsByShopId = async ({
    shopId,
    limit = DEFAULT_PRODUCT_LIMIT,
    skip = DEFAULT_PRODUCT_SKIP,
  }: FindProductsByShopIdInput): Promise<FindProductsByShopIdResult> => {
    const query: ProductQuery = { productShop: shopId, isDraft: true };

    return await ProductRepository.findProducts({
      query,
      limit,
      skip,
    });
  };

  /**
   * Find all published product by shop.
   */
  static findPublishedProductByShopId = async ({
    shopId,
    limit = DEFAULT_PRODUCT_LIMIT,
    skip = DEFAULT_PRODUCT_SKIP,
  }: FindProductsByShopIdInput): Promise<FindProductsByShopIdResult> => {
    const query: ProductQuery = { productShop: shopId, isPublished: true };

    return await ProductRepository.findProducts({
      query,
      limit,
      skip,
    });
  };
}
