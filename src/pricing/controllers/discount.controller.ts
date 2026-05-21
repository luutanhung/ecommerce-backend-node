import type { Request, Response } from "express";

import { DiscountService } from "../services/discount.service.js";

import { ResCode } from "../../constants/resCode.constants.js";
import { CreatedResponse } from "../../core/response/created.response.js";
import type { AuthPayload } from "../../domains/access/types/access.type.js";
import { sanitizeDiscount } from "../sanitizers/discount.sanitizer.js";
import type { CreateShopDiscountRequest } from "../validations/discount.validations.js";

export class DiscountController {
  /**
   * Create a new shop discount.
   */
  async createShopDiscount(req: Request, res: Response): Promise<void> {
    const createdDiscount = await DiscountService.createShopDiscount({
      ...(req.validated?.body as CreateShopDiscountRequest),
      shopId: (req.user as AuthPayload).userId,
    });

    new CreatedResponse({
      code: ResCode.DISCOUNT_CREATE_SUCCESS,
      data: sanitizeDiscount(createdDiscount),
    }).send(req, res);
  }
}

export const discountController = new DiscountController();
