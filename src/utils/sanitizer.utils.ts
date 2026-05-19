import _ from "lodash";

import type { ProductLean } from "../domains/product/product.type.js";
import type { Shop, ShopLean } from "../domains/shop/shop.type.js";

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
 * Sanitize shop document instance.
 */
export function sanitizeShop(shop: ShopLean): Partial<Shop> {
  const sanitizedShop = pickFields(["_id", "name", "email"], shop);

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
