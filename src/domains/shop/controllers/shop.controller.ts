import type { Request, Response } from "express";

import { ResCode } from "../../../constants/resCode.constants.js";
import { CreatedResponse } from "../../../core/response/created.response.js";
import type { AuthPayload } from "../../access/types/access.type.js";
import { ShopService } from "../shop.service.js";

export class ShopController {
  async registerShop(req: Request, res: Response) {
    new CreatedResponse({
      code: ResCode.SHOP_REGISTER_SUCCESS,
      data: await ShopService.registerShop({
        shopOwner: (req.user as AuthPayload).userId,
        ...req.body,
      }),
    }).send(req, res);
  }
}

export const shopController = new ShopController();
