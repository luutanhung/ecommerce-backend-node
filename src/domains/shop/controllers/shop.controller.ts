import type { Request, Response } from "express";

import { ShopService } from "../services/shop.service.js";

import { CreatedResponse } from "../../../core/response/created.response.js";
import { ResCode } from "../../../shared/constants/resCode.constants.js";
import type { AccessTokenPayload } from "../../access/types/access.type.js";
import type { RegisterShopRequest } from "../validations/shop.validations.js";

export class ShopController {
  /**
   * Register a new shop.
   */
  async registerShop(req: Request, res: Response) {
    new CreatedResponse({
      code: ResCode.SHOP_REGISTER_SUCCESS,
      data: await ShopService.registerShop({
        userId: (req.user as AccessTokenPayload).uid,
        ...(req.body as RegisterShopRequest),
      }),
    }).send(req, res);
  }
}

export const shopController = new ShopController();
