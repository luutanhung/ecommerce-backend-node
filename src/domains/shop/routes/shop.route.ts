import { Router } from "express";

import { shopController } from "../controllers/shop.controller.js";

import { asyncWrapper } from "../../../shared/helpers/asyncWrapper.js";
import { validateRequest } from "../../../shared/middlewares/validateRequest.middleware.js";
import { authenticateAccessToken } from "../../access/middlewares/access.middleware.js";
import { RegisterShopRequestBodySchema } from "../validations/shop.validations.js";

const router = Router();

/**
 * User registers a new shop.
 */
router.post(
  "/shops/register",
  authenticateAccessToken,
  validateRequest({
    body: RegisterShopRequestBodySchema,
  }),
  asyncWrapper(shopController.registerShop),
);

export { router as shopRouter };
