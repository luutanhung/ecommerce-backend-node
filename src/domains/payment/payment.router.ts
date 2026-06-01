import { Router } from "express";
import express from "express";

import { asyncWrapper } from "../../shared/helpers/asyncWrapper.js";
import { validateRequest } from "../../shared/middlewares/validateRequest.middleware.js";
import { authenticateAccessToken } from "../access/middlewares/access.middleware.js";

import { paymentController } from "./payment.controller.js";
import { CreatePaymentForOrderBodySchema } from "./payment.validations.js";

const router = Router();

router.post(
  "/payments/stripe/webhook",
  express.raw({
    type: "application/json",
  }),
  asyncWrapper(paymentController.handleStripeWebhook),
);

router.use(authenticateAccessToken);

router.post(
  "/payments/create",
  validateRequest({
    body: CreatePaymentForOrderBodySchema,
  }),
  asyncWrapper(paymentController.createPaymentForOrder),
);

export { router as paymentRouter };
