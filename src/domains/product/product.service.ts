import type {
  ProductFilterQuery,
  ProductUpdateQuery,
} from "./types/product.repository.type.js";
import type {
  CreateProductResult,
  FindProductOwnedByShopInput,
  FindProductsOwnedByShopInput,
  FindPublishedProductsInput,
  PublishShopProductInput,
  SearchProductsInput,
  UnpublishedShopProductInput,
} from "./types/product.service.type.js";
import type { CreateProductFactoryInput } from "./types/product.type.js";

import {
  PAGINATION_DEFAULT_LIMIT,
  PAGINATION_DEFAULT_PAGE,
} from "../../constants/pagination.constants.js";
import { ResCode } from "../../constants/resCode.constants.js";
import { ConflictAppError } from "../../core/error/conflictAppError.js";
import { NotFoundAppError } from "../../core/error/notFoundAppError.js";
import { toObjectId } from "../../shared/utils/mongoose.utils.js";
import {
  sanitizePagination,
  sanitizeProduct,
} from "../../shared/utils/sanitizer.utils.js";

import { ProductFactory } from "./product.factory.js";
import { ProductRepository } from "./product.repository.js";

export class ProductService {
  //==========
  // Sellers
  //==========
  /**
   * Create a new shop product.
   */
  static createShopProduct = async (
    createProductFactoryInput: CreateProductFactoryInput,
  ): Promise<CreateProductResult> => {
    return await ProductFactory.createProduct(createProductFactoryInput);
  };

  static async updateShopProduct() {}

  /**
   * Publish a draft product.
   */
  static publishShopProduct = async ({
    shopId,
    productId,
  }: PublishShopProductInput) => {
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
  static unpublishShopProduct = async ({
    shopId,
    productId,
  }: UnpublishedShopProductInput) => {
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
   * Find a product owned by user's shop.
   */
  static findProductOwnedByShop = async ({
    shopId,
    productId,
  }: FindProductOwnedByShopInput) => {
    const query: ProductFilterQuery = {
      productShop: toObjectId(shopId),
      _id: toObjectId(productId),
    };

    const foundProductOwnedByShop = await ProductRepository.findProduct({
      query,
    });

    if (!foundProductOwnedByShop) {
      throw new NotFoundAppError({
        code: ResCode.PRODUCT_NOT_FOUND,
      });
    }

    return sanitizeProduct(foundProductOwnedByShop);
  };

  /**
   * Find all draft products owned by shop.
   */
  static findDraftProductsOwnedByShop = async ({
    shopId,
    page = PAGINATION_DEFAULT_PAGE,
    limit = PAGINATION_DEFAULT_LIMIT,
  }: FindProductsOwnedByShopInput) => {
    const query: ProductFilterQuery = { productShop: shopId, isDraft: true };

    const paginationResult = await ProductRepository.findProducts({
      query,
      page,
      limit,
    });

    return sanitizePagination(paginationResult, sanitizeProduct);
  };

  /**
   * Find all published product by shop.
   */
  static findPublishedProductsOwnedByShop = async ({
    shopId,
    page = PAGINATION_DEFAULT_PAGE,
    limit = PAGINATION_DEFAULT_LIMIT,
  }: FindProductsOwnedByShopInput) => {
    const query: ProductFilterQuery = {
      productShop: shopId,
      isPublished: true,
    };

    const paginationResult = await ProductRepository.findProducts({
      query,
      page,
      limit,
    });

    return sanitizePagination(paginationResult, sanitizeProduct);
  };

  //==========
  // Public
  //==========
  /**
   * Searches products.
   */
  static async searchPublishedProducts({
    keyword,
    page = PAGINATION_DEFAULT_PAGE,
    limit = PAGINATION_DEFAULT_LIMIT,
  }: SearchProductsInput) {
    // CRITICAL: Only search published products.
    const query = {
      isPublished: true,
      $text: {
        $search: keyword,
      },
    };

    const paginationResult = await ProductRepository.findProducts({
      query,
      page,
      limit,
    });

    return sanitizePagination(paginationResult, sanitizeProduct);
  }

  /**
   * Find all published products.
   */
  static async findPublishedProducts({
    sortBy,
    sortOrder,
    page = PAGINATION_DEFAULT_PAGE,
    limit = PAGINATION_DEFAULT_LIMIT,
  }: FindPublishedProductsInput) {
    const query = {
      isPublished: true,
    };

    const paginationResult = await ProductRepository.findProducts({
      query,
      sortBy,
      sortOrder,
      page,
      limit,
    });

    return sanitizePagination(paginationResult, sanitizeProduct);
  }
}
