import type { CreateInventoryRepositoryInput } from "./inventory.repository.types.js";

export type CreateInventoryInput = CreateInventoryRepositoryInput;

export type UpdateInventoryInput = {
  inventoryId: string;
  stock: number;
};

export type IncreaseStockInput = {
  inventoryId: string;
  stock: number;
};

export type DecreaseStockInput = {
  inventoryId: string;
  stock: number;
};

export type CheckAvailabilityInput = {
  productId: string;
  quantity: number;
};

export type ReservationInventoryInput = {
  orderId: string;
  productId: string;
  quantity: number;
  expiresAt: Date;
};

export type ReleaseReservationInput = {
  orderId: string;
  productId: string;
};

export type CommitReservationInput = {
  orderId: string;
  productId: string;
};
