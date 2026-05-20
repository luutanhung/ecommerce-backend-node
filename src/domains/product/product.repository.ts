import type { PaginateResult } from "mongoose";

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
import { buildSelect, buildSort } from "../../shared/utils/mongoose.utils.js";

import { DEFAULT_PRODUCT_SELECT_FIELDS } from "./product.sanitizer.js";

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
