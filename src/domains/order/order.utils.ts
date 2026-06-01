import { nanoid } from "nanoid";

/**
 * Generate order number.
 */
export function generateOrderNumber(): string {
  return `ORD-${nanoid(8)}`;
}
