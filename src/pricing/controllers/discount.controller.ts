import type { Request, Response } from "express";

import { DiscountService } from "../services/discount.service.js";

import { ResCode } from "../../constants/resCode.constants.js";
import { CreatedResponse } from "../../core/response/created.response.js";

export class DiscountController {
  /**
   * Create a new shop discount.
   */
  async createShopDiscount(req: Request, res: Response): Promise<void> {
    new CreatedResponse({
      code: ResCode.DISCOUNT_CREATE_SUCCESS,
      data: await DiscountService.createShopDiscount(req.body),
    }).send(req, res);
  }
}

export const discountController = new DiscountController();
