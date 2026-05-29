import type { Request, Response } from "express";

import { ShopService } from "../services/shop.service.js";

import type { ShopLean } from "../types/shop.types.js";

import { BadRequestAppError } from "../../../core/error/badRequestAppError.js";
import { CreatedResponse } from "../../../core/response/created.response.js";
import { OKResponse } from "../../../core/response/ok.response.js";
import { ResCode } from "../../../shared/constants/resCode.constants.js";
import type { AccessTokenPayload } from "../../access/types/access.types.js";
import { sanitizeShop } from "../sanitizers/shop.sanitizer.js";
import type {
  RegisterShopRequestBody,
  UpdateShopInformationRequestBody,
} from "../validations/shop.validations.js";

export class ShopController {
  /**
   * Register a new shop.
   */
  async registerShop(req: Request, res: Response) {
    const registeredShop = await ShopService.registerShop({
      userId: (req.user as AccessTokenPayload).uid,
      ...(req.body as RegisterShopRequestBody),
    });

    if (!registeredShop) {
      throw new BadRequestAppError({
        code: ResCode.SHOP_REGISTER_FAILED,
      });
    }

    new CreatedResponse({
      code: ResCode.SHOP_REGISTER_SUCCESS,
      data: sanitizeShop(registeredShop),
    }).send(req, res);
  }

  /**
   * Update shop information.
   */
  async updateShopInformation(req: Request, res: Response) {
    const updatedShop = await ShopService.updateShopInformation({
      shopId: (req.ownedShop as ShopLean)._id.toString(),
      ...(req.body as UpdateShopInformationRequestBody),
    });
    console.log(updatedShop);

    new OKResponse({
      code: ResCode.SHOP_UPDATE_INFORMATION_SUCCESS,
      data: sanitizeShop(updatedShop),
    }).send(req, res);
  }
}

export const shopController = new ShopController();
