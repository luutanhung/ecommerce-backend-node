import { Router } from "express";
import express from "express";

import { asyncWrapper } from "../../shared/helpers/asyncWrapper.js";
import { authenticateAccessToken } from "../access/middlewares/access.middleware.js";

import { paymentController } from "./payment.controller.js";

const router = Router();

router.use(authenticateAccessToken);

router.post(
  "/payments/stripe/webhook",
  express.raw({
    type: "application/json",
  }),
  asyncWrapper(paymentController.handleStripeWebhook),
);
