import type { InventoryLean } from "./types/inventory.model.types.js";

import { transformMongoId } from "../../shared/utils/mongoose.utils.js";
import { pickFields } from "../../shared/utils/sanitizer.utils.js";

export const DEFAULT_INVENTORY_SELECT_FIELDS: Array<keyof InventoryLean> = [
  "_id",
  "shop",
  "product",
  "stock",
  "location",
  "reservations",
  "createdAt",
  "updatedAt",
] as const;

/**
 * Sanitize inventory document instance.
 */
export function sanitizeInventory(
  inventory: InventoryLean,
): Partial<InventoryLean> {
  const sanitizedInventory = pickFields(
    DEFAULT_INVENTORY_SELECT_FIELDS,
    inventory,
  );

  return transformMongoId(sanitizedInventory);
}
