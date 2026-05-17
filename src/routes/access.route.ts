import { Router } from "express";

import { accessController } from "../controllers/access.controller.js";

import { asyncWrapper } from "../helpers/asyncWrapper.js";
import {
  authenticateAccessToken,
  authenticateClientId,
} from "../middlewares/access.middleware.js";
import { validateRequest } from "../middlewares/validateRequest.middleware.js";
import {
  RefreshTokenSchema,
  ShopLoginSchema,
  ShopRegisterSchema,
} from "../validations/access.schema.js";

const router = Router();

// Register a new shop.
router.post(
  "/shop/register",
  validateRequest({ body: ShopRegisterSchema }),
  asyncWrapper(accessController.register),
);

// Login with shop's information.
router.post(
  "/shop/login",
  validateRequest({ body: ShopLoginSchema }),
  asyncWrapper(accessController.login),
);

// Refresh token.
router.post(
  "/shop/refreshToken",
  authenticateClientId,
  validateRequest({
    body: RefreshTokenSchema,
  }),
  asyncWrapper(accessController.refreshToken),
);

/**
 * Authentication.
 */
router.use(authenticateAccessToken);

// Logout.
router.post("/shop/logout", asyncWrapper(accessController.logout));

export { router as accessRouter };
