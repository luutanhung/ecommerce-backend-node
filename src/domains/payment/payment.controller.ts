import type { Request, Response } from "express";

import { PaymentService } from "./payment.service.js";

class PaymentController {
  async handleStripeWebhook(req: Request, res: Response) {
    await PaymentService.handleStripeWebhook({
      body: req.body,
      signature: req.headers["stripe-signature"] as string,
    });

    return res.status(200).send();
  }
}

export const paymentController = new PaymentController();
