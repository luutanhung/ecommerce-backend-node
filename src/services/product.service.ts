import { ConflictAppError } from "../core/error/conflictAppError.js";
import { NotFoundAppError } from "../core/error/notFoundAppError.js";

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
  UnpublishedProductInput,
} from "../domains/product/types/product.service.type.js";

import {
  DEFAULT_PRODUCT_LIMIT,
  DEFAULT_PRODUCT_SKIP,
} from "../constants/pagination.constants.js";
import { ResCode } from "../constants/resCode.constants.js";

import { toObjectId } from "../utils/mongoose.utils.js";
import { sanitizeProduct } from "../utils/sanitizer.utils.js";

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
    const query: ProductFilterQuery = {
      productShop: toObjectId(shopId),
      _id: toObjectId(productId),
    };

    const foundProduct = await ProductRepository.findProduct({ query });

    if (!foundProduct) {
      throw new NotFoundAppError({
        code: ResCode.PRODUCT_NOT_FOUND,
      });
    }

    if (foundProduct.isDraft === false && foundProduct.isPublished === true) {
      throw new ConflictAppError({
        code: ResCode.PRODUCT_ALREADY_PUBLISHED,
      });
    }

    const update: ProductUpdateQuery = {
      isDraft: false,
      isPublished: true,
    };

    const publishedProduct = await ProductRepository.updateProduct({
      query,
      update,
    });

    if (!publishedProduct) {
      if (!publishedProduct) {
        throw new NotFoundAppError({
          code: ResCode.PRODUCT_NOT_FOUND,
        });
      }
    }

    return sanitizeProduct(publishedProduct);
  };

  /**
   * Unpublished a published product.
   */
  static unpublishProduct = async ({
    shopId,
    productId,
  }: UnpublishedProductInput) => {
    const query: ProductFilterQuery = {
      productShop: toObjectId(shopId),
      _id: toObjectId(productId),
    };

    const foundProduct = await ProductRepository.findProduct({ query });

    if (!foundProduct) {
      throw new NotFoundAppError({
        code: ResCode.PRODUCT_NOT_FOUND,
      });
    }

    if (foundProduct.isDraft === true || foundProduct.isPublished === false) {
      throw new ConflictAppError({
        code: ResCode.PRODUCT_ALREADY_DRAFT,
      });
    }

    const update: ProductUpdateQuery = {
      isDraft: true,
      isPublished: false,
    };

    const unpublishedProduct = await ProductRepository.updateProduct({
      query,
      update,
    });

    if (!unpublishedProduct) {
      if (!unpublishedProduct) {
        throw new NotFoundAppError({
          code: ResCode.PRODUCT_NOT_FOUND,
        });
      }
    }

    return sanitizeProduct(unpublishedProduct);
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
