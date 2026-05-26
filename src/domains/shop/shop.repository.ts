import type { FindShopRepositoryInput } from "./types/shop.repository.type.js";
import type { ShopLean } from "./types/shop.type.js";

import type { TransactionOptions } from "../../shared/types/mongoose.type.js";

import type { Shop } from "./entities/shop.entity.js";

import { Shops } from "./shop.model.js";

/**
 * ShopRepository
 *
 * @remark Shop repository receives domain entity objects.
 * @remark Repository returns lean objects.
 */
export class ShopRepository {
  /**
   * Creates a new shop.
   */
  static async createShop(
    shop: Shop,
    options: TransactionOptions,
  ): Promise<ShopLean | null> {
    const [createdShop] = await Shops.create([shop.toPersistence()], {
      session: options.session,
    });

    if (!createdShop) {
      return null;
    }

    return createdShop.toObject();
  }

  /**
   * Find one shop.
   */
  static async findShop({
    query,
  }: FindShopRepositoryInput): Promise<ShopLean | null> {
    return await Shops.findOne(query).lean();
  }
}
