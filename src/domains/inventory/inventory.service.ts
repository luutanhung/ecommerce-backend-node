import type {
  InventoryDocument,
  InventoryLean,
} from "./types/inventory.model.types.js";
import type {
  CheckAvailabilityInput,
  CommitReservationInput,
  CreateInventoryInput,
  ReleaseReservationInput,
  ReservationInventoryInput,
  UpdateInventoryInput,
} from "./types/inventory.service.types.js";

import { BadRequestAppError } from "../../core/error/badRequestAppError.js";
import { NotFoundAppError } from "../../core/error/notFoundAppError.js";
import { ResCode } from "../../shared/constants/resCode.constants.js";
import type { TransactionOptions } from "../../shared/types/mongoose.type.js";
import { toObjectId } from "../../shared/utils/mongoose.utils.js";

import { Inventories } from "./inventory.model.js";
import { InventoryRepository } from "./inventory.repository.js";

export class InventoryService {
  // ==========================================
  // Management.
  // ==========================================
  /**
   * Create a new inventory record.
   */
  static async createInventory(
    input: CreateInventoryInput,
    options: TransactionOptions = {},
  ) {
    const createdInventory = await InventoryRepository.create(input, options);

    if (!createdInventory) {
      throw new BadRequestAppError({
        code: ResCode.INVENTORY_CREATE_FAILED,
      });
    }

    return createdInventory;
  }

  /**
   * Update inventory.
   */
  static async updateInventory(input: UpdateInventoryInput) {
    const { inventoryId, stock } = input;
    const inventory = await Inventories.findOne({
      _id: toObjectId(inventoryId),
    });

    if (!inventory) {
      throw new NotFoundAppError({
        code: ResCode.INVENTORY_NOT_FOUND,
      });
    }

    inventory.stock = stock;
    await inventory.save();

    return inventory.toObject();
  }

  // ==========================================
  // Reservation
  // ==========================================
  static getAvailableStock(inventory: InventoryLean): number {
    const reserved = inventory.reservations.reduce(
      (sum, reservation) => sum + reservation.quantity,
      0,
    );

    return inventory.stock - reserved;
  }

  static getReservedQuantity(inventory: InventoryLean): number {
    return inventory.stock - this.getAvailableStock(inventory);
  }

  static async checkAvailability(
    { productId, quantity }: CheckAvailabilityInput,
    // eslint-disable-next-line
    options: TransactionOptions = {},
  ): Promise<InventoryDocument> {
    const inventory = await Inventories.findOne({
      product: toObjectId(productId),
    });

    if (!inventory) {
      throw new NotFoundAppError({
        code: ResCode.INVENTORY_NOT_FOUND,
      });
    }

    const availableStock = this.getAvailableStock(inventory);

    if (availableStock < quantity) {
      throw new BadRequestAppError({
        code: ResCode.INVENTORY_STOCK_INSUFFICIENT,
      });
    }

    return inventory;
  }

  static async reserveInventory(
    { orderId, productId, quantity, expiresAt }: ReservationInventoryInput,
    // eslint-disable-next-line
    options: TransactionOptions = {},
  ): Promise<InventoryLean> {
    const inventory = await this.checkAvailability({
      productId,
      quantity,
    });

    inventory.reservations.push({
      order: toObjectId(orderId),
      quantity,
      expiresAt,
    });

    await inventory.save();

    return inventory.toObject();
  }

  static async releaseReservation({
    productId,
    orderId,
  }: ReleaseReservationInput) {
    const inventory = await Inventories.findOne({
      product: toObjectId(productId),
    });

    if (!inventory) {
      throw new NotFoundAppError({
        code: ResCode.INVENTORY_NOT_FOUND,
      });
    }

    const reservation = inventory.reservations.find(
      (reservation) => reservation.order.toString() === orderId,
    );

    if (inventory) {
      inventory.reservations.pull(reservation);
      await inventory.save();
    }

    return inventory.toObject();
  }

  static async commitReservation({
    orderId,
    productId,
  }: CommitReservationInput): Promise<InventoryLean> {
    const inventory = await Inventories.findOne({
      product: toObjectId(productId),
    });

    if (!inventory) {
      throw new NotFoundAppError({
        code: ResCode.INVENTORY_NOT_FOUND,
      });
    }

    const reservation = inventory.reservations.find(
      (reservation) => reservation.order.toString() === orderId,
    );

    if (!reservation) {
      throw new BadRequestAppError({
        code: ResCode.INVENTORY_RESERVATION_NOT_FOUND,
      });
    }

    inventory.stock -= reservation.quantity;

    inventory.reservations.pull(reservation);

    await inventory.save();

    return inventory.toObject();
  }
}
