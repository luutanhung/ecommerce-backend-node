import { Router } from "express";

import { shopController } from "../controllers/shop.controller.js";

import { asyncWrapper } from "../../../shared/helpers/asyncWrapper.js";
import { authenticateAccessToken } from "../../access/middlewares/access.middleware.js";

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
