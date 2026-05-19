import type {
  CreateShopRepositoryInput,
  FindShopRepositoryInput,
} from "./types/shop.repository.type.js";
import type { ShopLean } from "./types/shop.type.js";

import { Shops } from "./shop.model.js";

export class ShopRepository {
  /**
   * Creates a new shop.
   */
  static async createShop(payload: CreateShopRepositoryInput) {
    return await Shops.create(payload);
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
