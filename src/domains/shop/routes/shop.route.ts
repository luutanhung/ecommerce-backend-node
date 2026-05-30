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

router.use(authenticateAccessToken);

/**
 * User registers a new shop.
 */
router.post(
  "/shops/register",
  validateRequest({
    body: RegisterShopRequestBodySchema,
  }),
  asyncWrapper(shopController.registerShop),
);

/**
 * Verify shop.
 */
router.post(
  "/shops/:shopId/verify",
  validateRequest({
    params: ShopParamsSchema,
  }),
  authorizeShopOwnership,
  asyncWrapper(shopController.sendVerificationEmail),
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
