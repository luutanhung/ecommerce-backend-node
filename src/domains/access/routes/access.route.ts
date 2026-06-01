import { Router } from "express";

import { accessController } from "../controllers/access.controller.js";

import { asyncWrapper } from "../../../shared/helpers/asyncWrapper.js";
import { validateRequest } from "../../../shared/middlewares/validateRequest.middleware.js";
import { rateLimitMiddleware } from "../../../shared/rateLimit/rateLimit.middleware.js";
import { RATE_LIMIT_POLICY_NAME } from "../../../shared/rateLimit/rateLimit.policy.js";
import {
  authenticateAccessToken,
  authenticateClientId,
} from "../middlewares/access.middleware.js";
import { ensureUserRegistered } from "../middlewares/user.middleware.js";
import {
  LoginRequestSchema,
  RegisterRequestSchema,
  VerifyEmailRequestBodySchema,
} from "../validations/access.validations.js";
import {
  type UserParams,
  UserParamsSchema,
} from "../validations/user.validations.js";

const router = Router();

// ==========================================
// PUBLIC ROUTES (No Authentication Required)
// ==========================================
// Register a new account.
router.post(
  "/access/register",
  validateRequest({ body: RegisterRequestSchema }),
  asyncWrapper(accessController.register),
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
 * Send verification mail.
 */
router.post(
  "/access/:userId/send-verification-email",

  validateRequest({
    params: UserParamsSchema,
  }),
  ensureUserRegistered,

  rateLimitMiddleware(
    RATE_LIMIT_POLICY_NAME.ACCESS_SEND_EMAIL_VERIFICATION,
    (req) => (req.params as UserParams).userId,
  ),
  asyncWrapper(accessController.sendVerificationEmail),
);

/**
 * Verify account via email.
 */
router.post(
  "/access/:userId/verify-email",
  validateRequest({
    params: UserParamsSchema,
    body: VerifyEmailRequestBodySchema,
  }),
  ensureUserRegistered,
  asyncWrapper(accessController.verifyEmail),
);

router.use(authenticateAccessToken);

// ==========================================
// PROTECTED ROUTES (Authentication Required)
// ==========================================
// Logout.
router.post("/access/logout", asyncWrapper(accessController.logout));

export { router as accessRouter };
