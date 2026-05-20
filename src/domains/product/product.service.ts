import type { ClientSession } from "mongoose";

import { ProductType } from "./constants/product.constants.js";

import { Clothes } from "./models/clothing.model.js";
import { Electronics } from "./models/electronic.model.js";
import { Furnitures } from "./models/furniture.model.js";
import { Products } from "./models/product.model.js";

import type {
  ProductFilterQuery,
  ProductUpdateQuery,
} from "./types/product.repository.type.js";
import type {
  FindProductOwnedByShopInput,
  FindProductsOwnedByShopInput,
  FindPublishedProductInput,
  FindPublishedProductsInput,
  PublishShopProductInput,
  SearchProductsInput,
  UnpublishedShopProductInput,
} from "./types/product.service.type.js";
import type {
  CreateProductFactoryInput,
  ProductLean,
  UpdateShopProductInput,
} from "./types/product.type.js";

import {
  PAGINATION_DEFAULT_LIMIT,
  PAGINATION_DEFAULT_PAGE,
} from "../../constants/pagination.constants.js";
import { ResCode } from "../../constants/resCode.constants.js";
import { ConflictAppError } from "../../core/error/conflictAppError.js";
import { NotFoundAppError } from "../../core/error/notFoundAppError.js";
import { withTransaction } from "../../shared/helpers/withTransaction.js";
import {
  flattenObject,
  toObjectId,
} from "../../shared/utils/mongoose.utils.js";
import { sanitizePagination } from "../../shared/utils/sanitizer.utils.js";

import { ProductFactory } from "./product.factory.js";
import { ProductRepository } from "./product.repository.js";
import { sanitizeProduct } from "./product.sanitizer.js";
import { buildProductsQuery } from "./product.utils.js";

export class ProductService {
  //==========
  // Sellers
  //==========
  /**
   * Create a new shop product.
   */
  static async createShopProduct(
    createProductFactoryInput: CreateProductFactoryInput,
  ) {
    return await withTransaction(async (session: ClientSession) => {
      const productToCreate = await ProductFactory.createProduct(
        createProductFactoryInput,
      );

      return await ProductRepository.createProduct(productToCreate, {
        session,
      });
    });
  }

  /**
   * Update a shop product.
   */
  static async updateShopProduct({
    productId,
    payload,
  }: UpdateShopProductInput): Promise<ProductLean | null> {
    return await withTransaction(async (session: ClientSession) => {
      const { productAttributes, ...baseProductPayload } = payload;

      const flattenedAttributes = productAttributes
        ? flattenObject({
            productAttributes,
          } as Record<string, unknown>)
        : {};

      const updatedBaseProductPayload = {
        ...baseProductPayload,
        ...flattenedAttributes,
      };

      const updatedBaseProduct = await Products.findOneAndUpdate(
        {
          _id: toObjectId(productId),
        },
        {
          $set: updatedBaseProductPayload,
        },
        {
          new: true,
          session,
        },
      );

      if (!updatedBaseProduct) {
        throw new NotFoundAppError({
          code: ResCode.PRODUCT_NOT_FOUND,
        });
      }

      if (productAttributes) {
        const updatedBaseProductType = updatedBaseProduct.productType;

        // eslint-disable-next-line
        let childProductModel: any;
        if (updatedBaseProductType === ProductType.CLOTHING) {
          childProductModel = Clothes;
        } else if (updatedBaseProductType === ProductType.ELECTRONICS) {
          childProductModel = Electronics;
        } else if (updatedBaseProductType === ProductType.FURNITURE) {
          childProductModel = Furnitures;
        }

        await childProductModel.findByIdAndUpdate(
          { _id: toObjectId(productId) },
          flattenObject(productAttributes as Record<string, unknown>),
          {
            new: true,
            session,
          },
        );
      }

      return updatedBaseProduct;
    });
  }

  /**
   * Publish a draft product.
   */
  static async publishShopProduct({
    shopId,
    productId,
  }: PublishShopProductInput) {
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
  }

  /**
   * Unpublished a published product.
   */
  static async unpublishShopProduct({
    shopId,
    productId,
  }: UnpublishedShopProductInput) {
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
  }

  /**
   * Find a product owned by user's shop.
   */
  static async findProductOwnedByShop({
    shopId,
    productId,
  }: FindProductOwnedByShopInput) {
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
  }

  /**
   * Find all draft products owned by shop.
   */
  static async findDraftProductsOwnedByShop({
    shopId,
    page = PAGINATION_DEFAULT_PAGE,
    limit = PAGINATION_DEFAULT_LIMIT,
  }: FindProductsOwnedByShopInput) {
    const query: ProductFilterQuery = { productShop: shopId, isDraft: true };

    const paginationResult = await ProductRepository.findProducts({
      query,
      page,
      limit,
    });

    return sanitizePagination(paginationResult, sanitizeProduct);
  }

  /**
   * Find all published product by shop.
   */
  static async findPublishedProductsOwnedByShop({
    shopId,
    page = PAGINATION_DEFAULT_PAGE,
    limit = PAGINATION_DEFAULT_LIMIT,
  }: FindProductsOwnedByShopInput) {
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
  }

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

    ...filters
  }: FindPublishedProductsInput) {
    const query = buildProductsQuery(filters);

    const paginationResult = await ProductRepository.findProducts({
      query,
      sortBy,
      sortOrder,
      page,
      limit,
    });

    return sanitizePagination(paginationResult, sanitizeProduct);
  }

  /**
   * Find a single published product.
   */
  static async findPublishedProduct({ productId }: FindPublishedProductInput) {
    const foundProduct = await ProductRepository.findProduct({
      query: {
        _id: toObjectId(productId),
        isPublished: true,
      },
    });

    if (!foundProduct) {
      throw new NotFoundAppError({
        code: ResCode.PRODUCT_NOT_FOUND,
      });
    }

    return foundProduct;
  }
}
