import _ from "lodash";

import type { Shop, ShopLean } from "../domains/shop/shop.type.js";

export const pickFields = <
  T extends Record<string, unknown>,
  K extends keyof T,
>(
  fields: K[],
  obj: T,
): Pick<T, K> => {
  return _.pick(obj, fields) as Pick<T, K>;
};

/**
 * Sanitize shop document instance.
 */
export function sanitizeShop(shop: ShopLean): Partial<Shop> {
  return pickFields(["_id", "name", "email"], shop);
}
