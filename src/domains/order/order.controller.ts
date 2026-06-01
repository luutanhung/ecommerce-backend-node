import type { Request, Response } from "express";

import { OKResponse } from "../../core/response/ok.response.js";
import { ResCode } from "../../shared/constants/resCode.constants.js";
import type { AccessTokenPayload } from "../access/types/access.types.js";

import { OrderService } from "./order.service.js";
import type {
  CheckoutOrderRequestBody,
  CreateOrderRequestBody,
} from "./order.validations.js";

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

  async createOrder(req: Request, res: Response) {
    const createdOrder = await OrderService.createOrder({
      userId: (req.auth as AccessTokenPayload).uid,
      ...(req.body as CreateOrderRequestBody),
    });

    new OKResponse({
      code: ResCode.ORDER_CREATE_ORDER_SUCCEEDED,
      data: createdOrder,
    }).send(req, res);
  }
}

export const orderController = new OrderController();
