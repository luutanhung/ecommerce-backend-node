import type { CreateInventoryRepositoryInput } from "./inventory.repository.types.js";

export type CreateInventoryInput = CreateInventoryRepositoryInput;

export type UpdateInventoryInput = {
  inventoryId: string;
  stock: number;
};
