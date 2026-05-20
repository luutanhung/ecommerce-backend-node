import type { ProductLean } from "./types/product.type.js";

import { transformMongoId } from "../../shared/utils/mongoose.utils.js";
import { pickFields } from "../../shared/utils/sanitizer.utils.js";

export const DEFAULT_PRODUCT_SELECT_FIELDS: Array<keyof ProductLean> = [
  "_id",
  "productName",
  "productThumb",
  "productType",
  "productAttributes",
  "productPrice",
  "productCurrency",
  "productShop",
  "productDescription",
  "productAverageRating",
  "productVariations",
  "createdAt",
  "updatedAt",
] as const;

/*
 * Sanitize product document instance.
 */
export function sanitizeProduct(product: ProductLean): Partial<ProductLean> {
  const sanitizedProduct = pickFields(DEFAULT_PRODUCT_SELECT_FIELDS, product);

  return transformMongoId(sanitizedProduct);
}
