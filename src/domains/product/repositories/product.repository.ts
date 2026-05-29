import type { PaginateResult } from "mongoose";

import { Products } from "../models/product.model.js";

import type { ProductDocument, ProductLean } from "../types/product.type.js";
import type {
  CreateProductInput,
  FindProductRepositoryInput,
  FindProductsRepositoryInput,
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
import { DEFAULT_PRODUCT_SELECT_FIELDS } from "../product.sanitizer.js";

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
          productUser: toObjectId(userId),

          productShop: toObjectId(shopId),

          productName: name,

          productThumb: thumb,

          productDescription: description,

          productPrice: price,

          productQuantity: quantity,

          productCategory: categoryId ? toObjectId(categoryId) : undefined,

          productAttributes: attributes,

          productImages: images,

          productSlug: slug,

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
      .populate("productShop", "name email -_id")
      .lean();
  }

  /**
   * Find products.
   */
  static async findProducts({
    query = {},
    // Sort Options.
    sortBy = "time",
    sortOrder = SortOrder.DESC,
    // Pagination options.
    page = PAGINATION_DEFAULT_PAGE,
    limit = PAGINATION_DEFAULT_LIMIT,
    select = DEFAULT_PRODUCT_SELECT_FIELDS,
  }: FindProductsRepositoryInput): Promise<PaginateResult<ProductLean>> {
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
  }
}
