import type { Request, Response } from "express";

import { OKResponse } from "../../core/response/ok.response.js";
import { ResCode } from "../../shared/constants/resCode.constants.js";

import { PaymentService } from "./payment.service.js";
import type { CreatePaymentForOrderBody } from "./payment.validations.js";

class PaymentController {
  /**
   * Make a payment for an order.
   */
  async createPaymentForOrder(req: Request, res: Response) {
    new OKResponse({
      code: ResCode.PAYMENT_CREATE_SUCCEEDED,
      data: await PaymentService.createPaymentForOrder({
        ...(req.body as CreatePaymentForOrderBody),
      }),
    }).send(req, res);
  }

  async handleStripeWebhook(req: Request, res: Response) {
    await PaymentService.handleStripeWebhook({
      body: req.body,
      signature: req.headers["stripe-signature"] as string,
    });

    return res.status(200).send();
  }
}

export const paymentController = new PaymentController();
