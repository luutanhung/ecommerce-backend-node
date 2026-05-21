import { Router } from "express";

import { discountController } from "../controllers/discount.controller.js";

import { authenticateAccessToken } from "../../domains/access/middlewares/access.middleware.js";
import { authorizeShopOwnership } from "../../domains/shop/middlewares/shop.middleware.js";
import { asyncWrapper } from "../../shared/helpers/asyncWrapper.js";

const router = Router();

router.use(authenticateAccessToken);

/**
 * Create a new discount.
 */
router.post(
  "/shops/:shopId/discounts/create",
  authorizeShopOwnership,
  asyncWrapper(discountController.createDiscount),
);

export { router as discountRouter };
