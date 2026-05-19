import type { ShopLean } from "./types/shop.type.js";

import { Shops } from "./shop.model.js";

export class ShopService {
  /**
   * Finds a registered shop by its email.
   */
  static findShopByEmail = async (email: string): Promise<ShopLean | null> => {
    return await Shops.findOne({ email }).lean();
  };
}
