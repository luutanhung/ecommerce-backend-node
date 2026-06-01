import type {
  InventoryDocument,
  InventoryLean,
} from "./types/inventory.model.types.js";
import type {
  CheckAvailabilityInput,
  CommitReservationInput,
  CreateInventoryInput,
  DecreaseStockInput,
  IncreaseStockInput,
  ReleaseReservationInput,
  ReservationInventoryInput,
  ReserveOrderInventoryInput,
  UpdateInventoryInput,
} from "./types/inventory.service.types.js";

import { BadRequestAppError } from "../../core/error/badRequestAppError.js";
import { ConflictAppError } from "../../core/error/conflictAppError.js";
import { NotFoundAppError } from "../../core/error/notFoundAppError.js";
import { ResCode } from "../../shared/constants/resCode.constants.js";
import { LockService } from "../../shared/services/lock.service.js";
import type { TransactionOptions } from "../../shared/types/mongoose.type.js";
import { toObjectId } from "../../shared/utils/mongoose.utils.js";
import { Orders } from "../order/order.model.js";

import { Inventories } from "./inventory.model.js";
import { InventoryRepository } from "./inventory.repository.js";

export class InventoryService {
  private static async ensureInventoryExists(
    inventoryId: string,
  ): Promise<InventoryDocument> {
    const inventory = await Inventories.findOne({
      _id: toObjectId(inventoryId),
    });

    if (!inventory) {
      throw new NotFoundAppError({
        code: ResCode.INVENTORY_NOT_FOUND,
      });
    }

    return inventory;
  }
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
  static async updateInventory({ inventoryId, stock }: UpdateInventoryInput) {
    const inventory = await this.ensureInventoryExists(inventoryId);

    inventory.stock = stock;
    await inventory.save();

    return inventory.toObject();
  }

  static async increaseStock({ inventoryId, stock }: IncreaseStockInput) {
    const inventory = await this.ensureInventoryExists(inventoryId);

    inventory.stock += stock;

    await inventory.save();

    return inventory.toObject();
  }

  static async decreaseStock({ inventoryId, stock }: DecreaseStockInput) {
    const inventory = await this.ensureInventoryExists(inventoryId);

    if (inventory.stock < stock) {
      throw new BadRequestAppError({
        code: ResCode.INVENTORY_REQUESTED_QUANTITY_EXCEEDS_AVAILABLE_STOCK,
      });
    }

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

  static async reserveOrderInventory(
    { orderId, orderItems }: ReserveOrderInventoryInput,
    options: TransactionOptions = {},
  ) {
    const lockKeys: string[] = [];
    try {
      // Prevent deadlocks by locking in deterministic order.
      const sortedOrderItems = [...orderItems].sort((a, b) => {
        return a.productId.toString().localeCompare(b.productId.toString());
      });

      for (const orderItem of sortedOrderItems) {
        const { productId } = orderItem;

        const lockKey = `inventory:lock_v1:${productId}`;

        const acquired = await LockService.acquire(lockKey, 3);

        if (!acquired) {
          throw new ConflictAppError({
            code: ResCode.ORDER_PRODUCT_LOCKED,
          });
        }

        lockKeys.push(lockKey);
      }

      /**
       * Double-check inventory while locks are held.
       */
      for (const orderItem of sortedOrderItems) {
        await InventoryService.checkAvailability({
          productId: orderItem.productId,
          quantity: orderItem.quantity,
        });
      }

      /**
       * Reserve inventory.
       * */
      for (const orderItem of sortedOrderItems) {
        await InventoryService.reserveInventory(
          {
            orderId,
            productId: orderItem.productId.toString(),
            quantity: orderItem.quantity,
            expiresAt: new Date(Date.now() + 15 * 60 * 1000),
          },
          { session: options.session },
        );
      }
    } finally {
      await Promise.all(lockKeys.map((key) => LockService.release(key)));
    }
  }

  static async releaseReservation(
    { orderId }: ReleaseReservationInput,
    options: TransactionOptions = {},
  ) {
    const { session } = options;

    const orderObjectId = toObjectId(orderId);

    await Inventories.updateMany(
      {
        "reservations.order": orderObjectId,
      },
      {
        $pull: {
          reservations: {
            order: orderObjectId,
          },
        },
      },
      {
        session,
      },
    );
  }

  static async commitReservation(
    { orderId }: CommitReservationInput,
    options: TransactionOptions = {},
  ): Promise<void> {
    const { session } = options;

    const order = await Orders.findById(orderId, null, { session });

    if (!order) {
      throw new NotFoundAppError({
        code: ResCode.ORDER_NOT_FOUND,
      });
    }

    const productIds = order.items.map((item) => item.product);

    const inventories = await Inventories.find(
      {
        product: {
          $in: productIds,
        },
      },
      null,
      { session },
    );

    if (inventories.length !== productIds.length) {
      throw new NotFoundAppError({
        code: ResCode.INVENTORY_NOT_FOUND,
      });
    }

    for (const inventory of inventories) {
      const reservation = inventory.reservations.find(
        (reservation) => reservation.order.toString() === orderId,
      );

      if (!reservation) {
        throw new BadRequestAppError({
          code: ResCode.INVENTORY_RESERVATION_NOT_FOUND,
        });
      }

      inventory.stock -= reservation.quantity;

      inventory.reservations.pull(reservation._id);

      await inventory.save({
        session,
      });
    }
  }
}
