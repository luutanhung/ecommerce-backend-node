import type { PaginateResult } from "mongoose";

import { Products } from "../models/product.model.js";

import type { ProductDocument, ProductLean } from "../types/product.types.js";
import type {
  CreateProductInput,
  FindPaginatedRepositoryInput,
  FindProductRepositoryInput,
  UpdateProductRepositoryInput,
} from "./types/product.repository.type.js";

import { SortOrder } from "../../../shared/constants/common.constants.js";
import {
  PAGINATION_DEFAULT_LIMIT,
  PAGINATION_DEFAULT_PAGE,
} from "../../../shared/constants/pagination.constants.js";
import type { TransactionOptions } from "../../../shared/types/mongoose.type.js";
import {
  buildSelect,
  buildSort,
  toObjectId,
} from "../../../shared/utils/mongoose.utils.js";

export class ProductRepository {
  /**
   * Create a new product.
   */
  static async create(
    input: CreateProductInput,
    options: TransactionOptions,
  ): Promise<ProductLean | null> {
    const {
      userId,
      shopId,
      name,
      thumb,
      description,
      price,
      quantity,
      categoryId,
      attributes,
      images,
      slug,
      isPublished = false,
    } = input;
    const [createdProduct] = await Products.create(
      [
        {
          user: toObjectId(userId),

          shop: toObjectId(shopId),

          name: name,

          thumb: thumb,

          description: description,

          price: price,

          quantity: quantity,

          category: categoryId ? toObjectId(categoryId) : undefined,

          attributes: attributes,

          images: images,

          slug: slug,

          isPublished,
        },
      ],
      {
        session: options.session,
      },
    );

    return createdProduct ? createdProduct.toObject() : null;
  }

  /**
   * Update a single product.
   */
  static async update({
    query,
    update,
  }: UpdateProductRepositoryInput): Promise<ProductDocument | null> {
    return await Products.findOneAndUpdate(query, update, {
      runValidators: true,
    });
  }

  /**
   * Find a single product.
   */
  static async findOne({
    query,
  }: FindProductRepositoryInput): Promise<ProductLean | null> {
    return await Products.findOne(query)
      .populate("shop", "name email -_id")
      .lean();
  }

  /**
   * Find products.
   */
  static async findPaginated({
    filters,
    options,
  }: FindPaginatedRepositoryInput): Promise<PaginateResult<ProductLean>> {
    const {
      // Sort Options.
      sortBy = "time",
      sortOrder = SortOrder.DESC,
      // Pagination options.
      page = PAGINATION_DEFAULT_PAGE,
      limit = PAGINATION_DEFAULT_LIMIT,
      select,
    } = options || {};

    const sortOptions = buildSort({
      sortBy,
      sortOrder,
    });

    const selectOptions = buildSelect(select);

    return (await Products.paginate(filters, {
      page,
      limit,
      lean: true,
      sort: sortOptions,
      select: selectOptions,
      populate: [
        {
          path: "user",
          select: "email name -_id",
        },
        {
          path: "shop",
          select: "name slug status -_id",
        },
      ],
    })) as PaginateResult<ProductLean>;
  }
}
