import type { Request, Response } from "express";

import { DiscountService } from "../services/discount.service.js";

import { CreatedResponse } from "../../core/response/created.response.js";
import { OKResponse } from "../../core/response/ok.response.js";
import type { ShopLean } from "../../domains/shop/types/shop.type.js";
import type { ShopParams } from "../../domains/shop/validations/shop.validations.js";
import { ResCode } from "../../shared/constants/resCode.constants.js";
import type { PaginationQuery } from "../../shared/validations/pagination.validations.js";
import { sanitizeDiscount } from "../sanitizers/discount.sanitizer.js";
import type {
  ApplyDiscountToProductsRequest,
  CreateShopDiscountRequest,
  FindApplicableProductsByDiscountCode,
  FindShopDiscountByDiscountCodeRequest,
} from "../validations/discount.validations.js";

export class DiscountController {
  /**
   * Create a new shop discount.
   */
  async createShopDiscount(req: Request, res: Response): Promise<void> {
    const createdDiscount = await DiscountService.createShopDiscount({
      ...(req.validated?.body as CreateShopDiscountRequest),
      shopId: (req.ownedShop as ShopLean)._id.toString(),
    });

    new CreatedResponse({
      code: ResCode.DISCOUNT_CREATE_SUCCESS,
      data: sanitizeDiscount(createdDiscount),
    }).send(req, res);
  }

  /**
   * Apply discount to products.
   */
  async applyDiscountToProducts(req: Request, res: Response): Promise<void> {
    const { shopId } = req.validated?.params as ShopParams;
    const { code } = req.validated?.body as ApplyDiscountToProductsRequest;

    new OKResponse({
      code: ResCode.DISCOUNT_APPLY_DISCOUNT_TO_PRODUCTS,
      data: await DiscountService.applyDiscountToProducts({
        shopId,
        code,
      }),
    }).send(req, res);
  }

  /**
   * Find applicable products with discount code.
   */
  async findApplicableProductsByDiscountCode(
    req: Request,
    res: Response,
  ): Promise<void> {
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

  /**
   * Find discounts by shop.
   */
  async findDiscountsByShop(req: Request, res: Response): Promise<void> {
    const { shopId } = req.validated?.params as ShopParams;
    const { page, limit } = req.validated?.query as PaginationQuery;

    new OKResponse({
      code: ResCode.DISCOUNT_FIND_DISCOUNTS_BY_SHOP,
      data: await DiscountService.findDiscountsByShop({
        shopId,
        page,
        limit,
      }),
    }).send(req, res);
  }

  /**
   *
   */
  async findShopDiscountByDiscountCode(
    req: Request,
    res: Response,
  ): Promise<void> {
    const { shopId } = req.validated?.params as ShopParams;
    const { code } = req.validated
      ?.query as FindShopDiscountByDiscountCodeRequest;

    new OKResponse({
      code: ResCode.DISCOUNT_FIND_SHOP_DISCOUNT_BY_DISCOUNT_CODE_SUCCESS,
      data: await DiscountService.findShopDiscountByDiscountCode({
        shopId,
        code,
      }),
    }).send(req, res);
  }
}

export const discountController = new DiscountController();
