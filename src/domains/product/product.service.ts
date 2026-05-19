import _ from "lodash";

import type {
  ProductFilterQuery,
  ProductUpdateQuery,
} from "./types/product.repository.type.js";
import type {
  CreateProductResult,
  FindProductInput,
  FindProductsByShopIdInput,
  PublishProductInput,
  UnpublishedProductInput,
} from "./types/product.service.type.js";
import type {
  CreateProductFactoryInput,
  ProductLean,
} from "./types/product.type.js";

import {
  DEFAULT_PRODUCT_LIMIT,
  DEFAULT_PRODUCT_SKIP,
} from "../../constants/pagination.constants.js";
import { ResCode } from "../../constants/resCode.constants.js";
import { ConflictAppError } from "../../core/error/conflictAppError.js";
import { NotFoundAppError } from "../../core/error/notFoundAppError.js";
import { toObjectId } from "../../utils/mongoose.utils.js";
import { sanitizeProduct } from "../../utils/sanitizer.utils.js";

import { ProductFactory } from "./product.factory.js";
import { ProductRepository } from "./product.repository.js";

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
   * Find a single product.
   */
  static findProduct = async ({ shopId, productId }: FindProductInput) => {
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

    return sanitizeProduct(foundProduct);
  };

  /**
   * Find all draft products by shop.
   */
  static findDraftProductsByShopId = async ({
    shopId,
    limit = DEFAULT_PRODUCT_LIMIT,
    skip = DEFAULT_PRODUCT_SKIP,
  }: FindProductsByShopIdInput) => {
    const query: ProductFilterQuery = { productShop: shopId, isDraft: true };

    const draftProducts: ProductLean[] = await ProductRepository.findProducts({
      query,
      limit,
      skip,
    });

    return _.map(draftProducts, sanitizeProduct);
  };

  /**
   * Find all published product by shop.
   */
  static findPublishedProductByShopId = async ({
    shopId,
    limit = DEFAULT_PRODUCT_LIMIT,
    skip = DEFAULT_PRODUCT_SKIP,
  }: FindProductsByShopIdInput) => {
    const query: ProductFilterQuery = {
      productShop: shopId,
      isPublished: true,
    };

    const publishedProducts: ProductLean[] =
      await ProductRepository.findProducts({
        query,
        limit,
        skip,
      });

    return _.map(publishedProducts, sanitizeProduct);
  };
}
