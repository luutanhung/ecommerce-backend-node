import type { CreateInventoryInput } from "./types/inventory.service.types.js";

import { BadRequestAppError } from "../../core/error/badRequestAppError.js";
import { ResCode } from "../../shared/constants/resCode.constants.js";
import type { TransactionOptions } from "../../shared/types/mongoose.type.js";

import { InventoryRepository } from "./inventory.repository.js";

export class InventoryService {
  static async createInventory(
    payload: CreateInventoryInput,
    options: TransactionOptions = {},
  ) {
    const createdInventory = await InventoryRepository.create(payload, options);

    if (!createdInventory) {
      throw new BadRequestAppError({
        code: ResCode.INVENTORY_CREATE_FAILED,
      });
    }

    return createdInventory;
  }
}
