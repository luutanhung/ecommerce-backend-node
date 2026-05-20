import type { CreateInventoryInput } from "./types/inventory.service.types.js";

import { ResCode } from "../../constants/resCode.constants.js";
import { BadRequestAppError } from "../../core/error/badRequestAppError.js";

import { InventoryRepository } from "./inventory.repository.js";

export class InventoryService {
  static async createInventory(payload: CreateInventoryInput) {
    const createdInventory = await InventoryRepository.createInventory(payload);

    if (!createdInventory) {
      throw new BadRequestAppError({
        code: ResCode.INVENTORY_CREATE_FAILED,
      });
    }

    return createdInventory;
  }
}
