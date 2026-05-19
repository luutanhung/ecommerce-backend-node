import { ConflictAppError } from "../core/error/conflictAppError.js";

import { ProductFactory } from "../domains/product/product.factory.js";
import { ProductRepository } from "../domains/product/product.repository.js";
import type { CreateProductFactoryInput } from "../domains/product/product.type.js";
import type {
  ProductFilterQuery,
  ProductUpdateQuery,
} from "../domains/product/types/product.repository.type.js";
import type {
  CreateProductResult,
  FindProductsByShopIdInput,
  FindProductsByShopIdResult,
  PublishProductInput,
} from "../domains/product/types/product.service.type.js";

import {
  DEFAULT_PRODUCT_LIMIT,
  DEFAULT_PRODUCT_SKIP,
} from "../constants/pagination.constants.js";
import { ResCode } from "../constants/resCode.constants.js";

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
   * Publish a draft product.
   */
  static publishProduct = async ({
    shopId,
    productId,
  }: PublishProductInput) => {
    const query: ProductFilterQuery = { productShop: shopId, _id: productId };

    if (
      await ProductRepository.findProduct({
        query: {
          ...query,
          isDraft: false,
          isPublished: true,
        },
      })
    ) {
      throw new ConflictAppError({
        code: ResCode.PRODUCT_ALREADY_PUBLISHED,
      });
    }

    const update: ProductUpdateQuery = {
      isDraft: false,
      isPublished: true,
    };

    return await ProductRepository.updateProduct({
      query,
      update,
    });
  };

  /**
   * Find all draft products by shop.
   */
  static findDraftProductsByShopId = async ({
    shopId,
    limit = DEFAULT_PRODUCT_LIMIT,
    skip = DEFAULT_PRODUCT_SKIP,
  }: FindProductsByShopIdInput): Promise<FindProductsByShopIdResult> => {
    const query: ProductFilterQuery = { productShop: shopId, isDraft: true };

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
    const query: ProductFilterQuery = {
      productShop: shopId,
      isPublished: true,
    };

    return await ProductRepository.findProducts({
      query,
      limit,
      skip,
    });
  };
}
