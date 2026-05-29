import type { ShopLean } from "../types/shop.types.js";

import { transformMongoId } from "../../../shared/utils/mongoose.utils.js";
import { pickFields } from "../../../shared/utils/sanitizer.utils.js";

/**
 * Sanitize shop document instance.
 */
export function sanitizeShop(shop: ShopLean): Partial<ShopLean> {
  const sanitizedShop = pickFields(
    ["_id", "shopUser", "shopName", "shopStatus", "shopStatus"],
    shop,
  );

  return transformMongoId(sanitizedShop);
}
