import {
  DEFAULT_PRODUCT_LIMIT,
  DEFAULT_PRODUCT_SKIP,
} from "../../constants/pagination.constants.js";
import { Products } from "../../models/product/product.model.js";
import type {
  FindProductsInput,
  FindProductsResult,
} from "../../types/product.type.js";

export class ProductRepository {
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
