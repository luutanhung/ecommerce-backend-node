import type {
  CreateInventoryInput,
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
    console.log("input:", input);
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
}
