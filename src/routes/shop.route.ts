import { Router } from "express";

import { asyncWrapper } from "../shared/helpers/asyncWrapper.js";

import { authenticateAccessToken } from "../domains/access/middlewares/access.middleware.js";

import { shopController } from "../controllers/shop.controller.js";

const router = Router();

/**
 * User registers a new shop.
 */
router.post(
  "/shops/register",
  authenticateAccessToken,
  asyncWrapper(shopController.registerShop),
);

export { router as shopRouter };
