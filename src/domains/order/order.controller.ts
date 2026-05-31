import type { Request, Response } from "express";

import { CheckoutService } from "./services/checkout.service.js";

import { OKResponse } from "../../core/response/ok.response.js";
import { ResCode } from "../../shared/constants/resCode.constants.js";
import type { AccessTokenPayload } from "../access/types/access.types.js";

import type { CheckoutOrderRequestBody } from "./order.validations.js";

export class OrderController {
  async checkoutOrder(req: Request, res: Response) {
    const data = await CheckoutService.checkoutOrder({
      userId: (req.auth as AccessTokenPayload).uid,
      ...(req.body as CheckoutOrderRequestBody),
    });

    new OKResponse({
      code: ResCode.ORDER_CHECKOUT_SUCCESS,
      data,
    }).send(req, res);
  }
}

export const orderController = new OrderController();
