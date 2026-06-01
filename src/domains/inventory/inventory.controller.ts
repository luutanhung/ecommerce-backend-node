import type { Request, Response } from "express";

import { CreatedResponse } from "../../core/response/created.response.js";
import { OKResponse } from "../../core/response/ok.response.js";
import { ResCode } from "../../shared/constants/resCode.constants.js";

import { InventoryMapper } from "./inventory.mapper.js";
import { InventoryService } from "./inventory.service.js";

export class InventoryController {
  /**
   * Create a new inventory.
   */
  async createInventory(req: Request, res: Response) {
    const createdInventory = await InventoryService.createInventory(req.body);

    new CreatedResponse({
      code: ResCode.INVENTORY_CREATE_SUCCEEDED,
      data: InventoryMapper.toPublic(createdInventory),
    }).send(req, res);
  }

  /**
   * Update an inventory.
   */
  async updateInventory(req: Request, res: Response) {
    const updatedInventory = await InventoryService.updateInventory(req.body);

    new OKResponse({
      code: ResCode.INVENTORY_UPDATE_SUCCEEDED,
      data: InventoryMapper.toPublic(updatedInventory),
    }).send(req, res);
  }

  /**
   * Increase stock.
   */
  async increaseStock(req: Request, res: Response) {
    const updatedInventory = await InventoryService.increaseStock(req.body);

    new OKResponse({
      code: ResCode.INVENTORY_INCREASE_STOCK_SUCCEEDED,
      data: InventoryMapper.toPublic(updatedInventory),
    }).send(req, res);
  }

  /**
   * Decrease stock.
   */
  async decreaseStock(req: Request, res: Response) {
    const updatedInventory = await InventoryService.decreaseStock(req.body);

    new OKResponse({
      code: ResCode.INVENTORY_DECREASE_STOCK_SUCCEEDED,
      data: InventoryMapper.toPublic(updatedInventory),
    }).send(req, res);
  }
}

export const inventoryController = new InventoryController();
