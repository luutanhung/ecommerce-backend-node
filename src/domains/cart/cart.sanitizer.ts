import type { CartLean } from "./types/cart.types.js";

import { transformMongoId } from "../../shared/utils/mongoose.utils.js";
import { pickFields } from "../../shared/utils/sanitizer.utils.js";

export const DEFAULT_CART_SELECT_FIELDS: Array<keyof CartLean> = [
  "_id",
  "user",
  "items",
  "state",
  "createdAt",
  "updatedAt",
] as const;

/*
 * Sanitize cart.
 */
export function sanitizeCart(cart: CartLean): Partial<CartLean> {
  const sanitizedCart = pickFields(DEFAULT_CART_SELECT_FIELDS, cart);

  return transformMongoId(sanitizedCart);
}
