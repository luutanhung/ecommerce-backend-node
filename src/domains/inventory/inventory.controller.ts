import type { Request, Response } from "express";

import { CreatedResponse } from "../../core/response/created.response.js";
import { ResCode } from "../../shared/constants/resCode.constants.js";

import { sanitizeInventory } from "./inventory.sanitizer.js";
import { InventoryService } from "./inventory.service.js";

export class InventoryController {
  async createInventory(req: Request, res: Response) {
    const createdInventory = await InventoryService.createInventory(req.body);

    new CreatedResponse({
      code: ResCode.INVENTORY_CREATE_SUCCEEDED,
      data: sanitizeInventory(createdInventory),
    }).send(req, res);
  }
}

export const inventoryController = new InventoryController();
