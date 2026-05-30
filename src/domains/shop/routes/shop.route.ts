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
  VerifyShopRequestBodySchema,
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
 * Send verification email.
 */
router.post(
  "/shops/:shopId/send-verification-email",
  validateRequest({
    params: ShopParamsSchema,
  }),
  authorizeShopOwnership,
  asyncWrapper(shopController.sendVerificationEmail),
);

/**
 * Verify shop.
 */
router.post(
  "/shops/:shopId/verify",
  validateRequest({
    params: ShopParamsSchema,
    body: VerifyShopRequestBodySchema,
  }),
  authorizeShopOwnership,
  asyncWrapper(shopController.verifyShop),
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

/**
 * Close shop.
 */
router.post(
  "/shops/:shopId/close",
  validateRequest({
    params: ShopParamsSchema,
  }),
  authorizeShopOwnership,
  asyncWrapper(shopController.closeShop),
);

export { router as shopRouter };
