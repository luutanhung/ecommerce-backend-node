import { Router } from "express";

import { discountController } from "../controllers/discount.controller.js";

import { authenticateAccessToken } from "../../domains/access/middlewares/access.middleware.js";
import { authorizeShopOwnership } from "../../domains/shop/middlewares/shop.middleware.js";
import { asyncWrapper } from "../../shared/helpers/asyncWrapper.js";
import { validateRequest } from "../../shared/middlewares/validateRequest.middleware.js";
import {
  CreateShopDiscountRequestSchema,
  FindApplicableProductsByDiscountCodeRequestSchema,
} from "../validations/discount.validations.js";

const router = Router();

router.use(authenticateAccessToken);

/**
 * Create a new shop discount.
 */
router.post(
  "/shops/:shopId/discounts/create",
  authorizeShopOwnership,
  validateRequest({
    body: CreateShopDiscountRequestSchema,
  }),
  asyncWrapper(discountController.createShopDiscount),
);

/**
 * Find applicable products with discount code.
 */
router.get(
  "/shops/:shopId/products/discounted",
  validateRequest({
    query: FindApplicableProductsByDiscountCodeRequestSchema,
  }),
  asyncWrapper(discountController.findApplicableProductsByDiscountCode),
);

export { router as discountRouter };
