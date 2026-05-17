import _ from "lodash";

import type { ShopDocument } from "../types/shop.type.js";

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
export function sanitizeShop(shop: ShopDocument) {
  return pickFields(["_id", "name", "email"], shop.toObject());
}
