import type { Request, Response } from "express";

import { OKResponse } from "../../core/response/ok.response.js";
import { ResCode } from "../../shared/constants/resCode.constants.js";
import type { AccessTokenPayload } from "../access/types/access.types.js";

import { OrderService } from "./order.service.js";
import type { CheckoutOrderRequestBody } from "./order.validations.js";

export class OrderController {
  async checkoutOrder(req: Request, res: Response) {
    const data = await OrderService.checkoutOrder({
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
