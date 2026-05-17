import { Shops } from "../models/shop.model.js";

import type { Shop } from "../types/shop.type.js";

/**
 * Finds a registered shop by its email.
 */
export const findShopByEmail = async ({
  email,
}: {
  email: string;
}): Promise<Shop | null> => {
  return await Shops.findOne({ email }).lean();
};
