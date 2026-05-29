import type { ProductLean } from "./types/product.type.js";

import { transformMongoId } from "../../shared/utils/mongoose.utils.js";
import { pickFields } from "../../shared/utils/sanitizer.utils.js";

export const DEFAULT_PRODUCT_SELECT_FIELDS: Array<keyof ProductLean> = [
  "_id",
  "name",
  "shop",
  "thumb",
  "attributes",
  "price",
  "currency",
  "description",
  "attributes",
  "averageRating",
  "createdAt",
  "updatedAt",
] as const;

/*
 * Sanitize product.
 */
export function sanitizeProduct(product: ProductLean): Partial<ProductLean> {
  const sanitizedProduct = pickFields(DEFAULT_PRODUCT_SELECT_FIELDS, product);

  return transformMongoId(sanitizedProduct);
}
