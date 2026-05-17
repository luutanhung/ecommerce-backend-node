import { Shops } from "../models/shop.model.js";

import type { ShopLean } from "../types/shop.type.js";

/**
 * Finds a registered shop by its email.
 */
export const findShopByEmail = async (
  email: string,
): Promise<ShopLean | null> => {
  return await Shops.findOne({ email }).lean();
};
