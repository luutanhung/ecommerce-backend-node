import { Products } from "./models/product.model.js";

import type {
  FindProductRepositoryInput,
  FindProductsRepositoryInput,
  UpdateProductRepositoryInput,
} from "./types/product.repository.type.js";
import type { ProductDocument, ProductLean } from "./types/product.type.js";

import {
  DEFAULT_PRODUCT_LIMIT,
  DEFAULT_PRODUCT_SKIP,
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
      new: true,
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
    limit = DEFAULT_PRODUCT_LIMIT,
    skip = DEFAULT_PRODUCT_SKIP,
  }: FindProductsRepositoryInput): Promise<ProductLean[]> => {
    return await Products.find(query)
      .populate("productShop", "name email -_id")
      .sort({ updatedAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean()
      .exec();
  };
}
