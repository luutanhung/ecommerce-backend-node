import _ from "lodash";
import type { PaginateResult } from "mongoose";

import type { User, UserLean } from "../../domains/access/types/access.type.js";
import type { Shop, ShopLean } from "../../domains/shop/types/shop.type.js";

import { transformMongoId } from "./mongoose.utils.js";

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
 * Sanitize user document instance.
 */
export function sanitizeUser(user: UserLean): Partial<User> {
  const sanitizedUser = pickFields(
    [
      "_id",
      "email",
      "phoneNumber",
      "name",
      "nationalId",
      "taxIdentificationNumber",
    ],
    user,
  );

  return transformMongoId(sanitizedUser);
}

/**
 * Sanitize shop document instance.
 */
export function sanitizeShop(shop: ShopLean): Partial<Shop> {
  const sanitizedShop = pickFields(
    ["_id", "shopOwner", "shopName", "shopStatus", "shopStatus"],
    shop,
  );

  return transformMongoId(sanitizedShop);
}

/**
 * Sanitize paginated products.
 */
type Sanitizer<T, R> = (item: T) => R;

/**
 * Sanitize paginated result.
 */
export function sanitizePagination<T, R>(
  pagination: PaginateResult<T>,

  sanitizer: Sanitizer<T, R>,
): PaginateResult<R> {
  return {
    ...pagination,

    docs: pagination.docs.map(sanitizer),
  };
}
