import { Router } from "express";

import { asyncWrapper } from "../../shared/helpers/asyncWrapper.js";
import { validateRequest } from "../../shared/middlewares/validateRequest.middleware.js";
import { authenticateAccessToken } from "../access/middlewares/access.middleware.js";

import { orderController } from "./order.controller.js";
import { CheckoutOrderRequestBodySchema } from "./order.validations.js";

const router = Router();

router.use(authenticateAccessToken);

/**
 * Checkout an order to preview before making a purchase.
 */
router.post(
  "/orders/checkout",
  validateRequest({
    body: CheckoutOrderRequestBodySchema,
  }),
  asyncWrapper(orderController.checkoutOrder),
);

export { router as orderRouter };
