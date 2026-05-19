import { Products } from "../../models/product/product.model.js";
import type {
  FindDraftProductsByShopIdInput,
  FindDraftProductsByShopIdResult,
} from "../../types/product.type.js";

const DEFAULT_PRODUCT_LIMIT: number = 50;
const DEFAULT_PRODUCT_SKIP: number = 0;

export class ProductRepository {
  /**
   * Find all draft products by shop.
   */
  static findDraftProductsByShopId = async ({
    productShop,
    limit = DEFAULT_PRODUCT_LIMIT,
    skip = DEFAULT_PRODUCT_SKIP,
  }: FindDraftProductsByShopIdInput): Promise<FindDraftProductsByShopIdResult> => {
    const query = { productShop, isDraft: true };

    return await Products.find(query)
      .populate("productShop", "name email -_id")
      .sort({ updatedAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean()
      .exec();
  };
}
