import type { ShopLean } from "../domains/shop/shop.type.js";

import { Shops } from "../models/shop.model.js";

export class ShopService {
  /**
   * Finds a registered shop by its email.
   */
  static findShopByEmail = async (email: string): Promise<ShopLean | null> => {
    return await Shops.findOne({ email }).lean();
  };
}
