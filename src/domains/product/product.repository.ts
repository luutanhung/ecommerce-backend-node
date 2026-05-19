import type {
  FindProductsInput,
  FindProductsResult,
  UpdateProductInput,
  UpdateProductResult,
} from "./types/product.repository.type.js";

import {
  DEFAULT_PRODUCT_LIMIT,
  DEFAULT_PRODUCT_SKIP,
} from "../../constants/pagination.constants.js";
import { Products } from "../../models/product/product.model.js";

export class ProductRepository {
  /**
   * Update a single product.
   */
  static updateProduct = async ({
    query,
    update,
  }: UpdateProductInput): Promise<UpdateProductResult> => {
    return await Products.findOneAndUpdate(query, update, {
      new: true,
      runValidators: true,
    });
  };

  /**
   * Find products.
   */
  static findProducts = async ({
    query = {},
    limit = DEFAULT_PRODUCT_LIMIT,
    skip = DEFAULT_PRODUCT_SKIP,
  }: FindProductsInput): Promise<FindProductsResult> => {
    return await Products.find(query)
      .populate("productShop", "name email -_id")
      .sort({ updatedAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean()
      .exec();
  };
}
