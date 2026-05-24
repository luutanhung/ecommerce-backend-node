import type { Request, Response } from "express";

import { DiscountService } from "../services/discount.service.js";

import { ResCode } from "../../constants/resCode.constants.js";
import { CreatedResponse } from "../../core/response/created.response.js";
import { OKResponse } from "../../core/response/ok.response.js";
import type { AuthPayload } from "../../domains/access/types/access.type.js";
import type { ShopLean } from "../../domains/shop/types/shop.type.js";
import { sanitizeDiscount } from "../sanitizers/discount.sanitizer.js";
import type {
  CreateShopDiscountRequest,
  FindApplicableProductsByDiscountCode,
} from "../validations/discount.validations.js";

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

  /**
   * Find applicable products with discount code.
   */
  async findApplicableProductsByDiscountCode(req: Request, res: Response) {
    const { code, page, limit } = req.validated
      ?.query as FindApplicableProductsByDiscountCode;

    new OKResponse({
      code: ResCode.DISCOUNT_FIND_APPLICABLE_PRODUCTS_BY_DISCOUNT_CODE_SUCCESS,
      data: await DiscountService.findApplicableProductsByDiscountCode({
        shopId: (req.ownedShop as ShopLean)._id.toString(),
        code,
        page,
        limit,
      }),
    }).send(req, res);
  }
}

export const discountController = new DiscountController();
