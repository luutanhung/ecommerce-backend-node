import { Router } from "express";

import { shopController } from "../controllers/shop.controller.js";

import { asyncWrapper } from "../../../shared/helpers/asyncWrapper.js";
import { validateRequest } from "../../../shared/middlewares/validateRequest.middleware.js";
import { authenticateAccessToken } from "../../access/middlewares/access.middleware.js";
import { authorizeShopOwnership } from "../middlewares/shop.middleware.js";
import {
  RegisterShopRequestBodySchema,
  ShopParamsSchema,
  UpdateShopInformationRequestBodySchema,
} from "../validations/shop.validations.js";

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

/**
 * User changes shop information.
 */
router.post(
  "/shops/:shopId/update-information",
  validateRequest({
    params: ShopParamsSchema,
    body: UpdateShopInformationRequestBodySchema,
  }),
  authorizeShopOwnership,
  asyncWrapper(shopController.updateShopInformation),
);

export { router as shopRouter };
