import type { PaginateResult } from "mongoose";

import { Products } from "./models/product.model.js";

import type {
  FindProductRepositoryInput,
  FindProductsRepositoryInput,
  UpdateProductRepositoryInput,
} from "./types/product.repository.type.js";
import type { ProductDocument, ProductLean } from "./types/product.type.js";

import {
  PAGINATION_DEFAULT_LIMIT,
  PAGINATION_DEFAULT_PAGE,
} from "../../constants/pagination.constants.js";

export class ProductRepository {
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
    page = PAGINATION_DEFAULT_PAGE,
    limit = PAGINATION_DEFAULT_LIMIT,
  }: FindProductsRepositoryInput): Promise<PaginateResult<ProductLean>> => {
    return (await Products.paginate(query, {
      page,
      limit,
      lean: true,
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
      sort: {
        updatedAt: -1,
      },
    })) as PaginateResult<ProductLean>;
  };
}
