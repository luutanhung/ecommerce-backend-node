import _ from "lodash";

import type { User, UserLean } from "../../domains/access/types/access.type.js";
import type { ProductLean } from "../../domains/product/types/product.type.js";
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
  const sanitizedUser = pickFields(["_id", "name", "email"], user);

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
 * Sanitize product document instance.
 */
export function sanitizeProduct(product: ProductLean): Partial<ProductLean> {
  const sanitizedProduct = pickFields(
    [
      "_id",
      "productName",
      "productThumb",
      "productType",
      "productAttributes",
      "productPrice",
      "productQuantity",
      "productShop",
      "productDescription",
      "productAverageRating",
      "productVariations",
      "createdAt",
      "updatedAt",
    ],
    product,
  );

  return transformMongoId(sanitizedProduct);
}
