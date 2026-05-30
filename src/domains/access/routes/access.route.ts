import { Router } from "express";

import { accessController } from "../controllers/access.controller.js";

import { asyncWrapper } from "../../../shared/helpers/asyncWrapper.js";
import { validateRequest } from "../../../shared/middlewares/validateRequest.middleware.js";
import {
  authenticateAccessToken,
  authenticateClientId,
} from "../middlewares/access.middleware.js";
import {
  LoginRequestSchema,
  RegisterRequestSchema,
  SendVerificationEmailRequestBodySchema,
} from "../validations/access.validations.js";

const router = Router();

// Register a new shop.
router.post(
  "/access/register",
  validateRequest({ body: RegisterRequestSchema }),
  asyncWrapper(accessController.register),
);

/**
 * Send verification mail.
 */
router.post(
  "/access/send-verification-email",
  validateRequest({ body: SendVerificationEmailRequestBodySchema }),
  asyncWrapper(accessController.sendVerificationEmail),
);

/**
 * Login with account information.
 */
router.post(
  "/access/login",
  validateRequest({ body: LoginRequestSchema }),
  asyncWrapper(accessController.login),
);

/**
 * Refresh token.
 */
router.post(
  "/access/refreshToken",
  authenticateClientId,
  asyncWrapper(accessController.refreshToken),
);

/**
 * Authentication.
 */
router.use(authenticateAccessToken);

// Logout.
router.post("/access/logout", asyncWrapper(accessController.logout));

export { router as accessRouter };
