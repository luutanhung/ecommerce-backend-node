import type { OrderItem } from "../../order/types/order.service.types.js";

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

export type ReserveOrderInventoryInput = {
  orderId: string;
  orderItems: OrderItem[];
};

export type releaseReservationByOrderInput = {
  orderId: string;
};

export type commitReservationByOrderInput = {
  orderId: string;
};
