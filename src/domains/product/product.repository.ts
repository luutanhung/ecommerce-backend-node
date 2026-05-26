import type { PaginateResult } from "mongoose";

import { Clothes } from "./models/clothing.model.js";
import { Electronics } from "./models/electronic.model.js";
import { Furnitures } from "./models/furniture.model.js";
import { Products } from "./models/product.model.js";

import type {
  FindProductRepositoryInput,
  FindProductsRepositoryInput,
  UpdateProductRepositoryInput,
} from "./types/product.repository.type.js";
import type { ProductDocument, ProductLean } from "./types/product.type.js";

import { SortOrder } from "../../constants/common.constants.js";
import {
  PAGINATION_DEFAULT_LIMIT,
  PAGINATION_DEFAULT_PAGE,
} from "../../constants/pagination.constants.js";
import { ResCode } from "../../constants/resCode.constants.js";
import { BadRequestAppError } from "../../core/error/badRequestAppError.js";
import type { TransactionOptions } from "../../shared/types/mongoose.type.js";
import { buildSelect, buildSort } from "../../shared/utils/mongoose.utils.js";

import type { Product } from "./entities/baseProduct.entity.js";
import { Clothing } from "./entities/clothing.entity.js";
import { Electronic } from "./entities/electronic.entity.js";
import { Furniture } from "./entities/furniture.entity.js";

import { DEFAULT_PRODUCT_SELECT_FIELDS } from "./product.sanitizer.js";

export class ProductRepository {
  /**
   * Create a new product.
   */
  static async createProduct(
    product: Product<unknown>,
    options: TransactionOptions,
  ): Promise<ProductLean | null> {
    if (product instanceof Clothing) {
      const clothing = await Clothes.create(
        [product.toAttributesPersistence()],
        {
          session: options.session,
        },
      );

      const [createdProduct] = await Products.create(
        [
          {
            ...product.toPersistence(),
            _id: clothing[0]!._id,
          },
        ],
        {
          session: options.session,
        },
      );

      if (!createdProduct) {
        return null;
      }

      return createdProduct.toObject();
    } else if (product instanceof Electronic) {
      const electronic = await Electronics.create(
        [product.toAttributesPersistence()],
        {
          session: options.session,
        },
      );

      const [createdProduct] = await Products.create(
        [
          {
            ...product.toPersistence(),
            _id: electronic[0]!._id,
          },
        ],
        {
          session: options.session,
        },
      );

      if (!createdProduct) {
        return null;
      }

      return createdProduct.toObject();
    } else if (product instanceof Furniture) {
      const furniture = await Furnitures.create(
        [product.toAttributesPersistence()],
        {
          session: options.session,
        },
      );

      const [createdProduct] = await Products.create(
        [
          {
            ...product.toPersistence(),
            _id: furniture[0]!._id,
          },
        ],
        {
          session: options.session,
        },
      );

      if (!createdProduct) {
        return null;
      }

      return createdProduct.toObject();
    }

    throw new BadRequestAppError({
      code: ResCode.PRODUCT_TYPE_UNSUPPORTED,
    });
  }

  /**
   * Update a single product.
   */
  static updateProduct = async ({
    query,
    update,
  }: UpdateProductRepositoryInput): Promise<ProductDocument | null> => {
    return await Products.findOneAndUpdate(query, update, {
      runValidators: true,
    });
  };

  /**
   * Find a single product.
   */
  static findProduct = async ({
    query,
  }: FindProductRepositoryInput): Promise<ProductLean | null> => {
    return await Products.findOne(query)
      .populate("productShop", "name email -_id")
      .lean();
  };

  /**
   * Find products.
   */
  static findProducts = async ({
    query = {},
    // Sort Options.
    sortBy = "time",
    sortOrder = SortOrder.DESC,
    // Pagination options.
    page = PAGINATION_DEFAULT_PAGE,
    limit = PAGINATION_DEFAULT_LIMIT,
    select = DEFAULT_PRODUCT_SELECT_FIELDS,
  }: FindProductsRepositoryInput): Promise<PaginateResult<ProductLean>> => {
    const sortOptions = buildSort({
      sortBy,
      sortOrder,
    });

    const selectOptions = buildSelect(select);

    return (await Products.paginate(query, {
      page,
      limit,
      lean: true,
      sort: sortOptions,
      select: selectOptions,
      populate: [
        {
          path: "productOwner",
          select: "email name -_id",
        },
        {
          path: "productShop",
          select: "shopName shopSlug shopStatus -_id",
        },
      ],
    })) as PaginateResult<ProductLean>;
  };
}
