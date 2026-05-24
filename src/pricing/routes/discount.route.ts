import { Router } from "express";

import { discountController } from "../controllers/discount.controller.js";

import { authenticateAccessToken } from "../../domains/access/middlewares/access.middleware.js";
import { authorizeShopOwnership } from "../../domains/shop/middlewares/shop.middleware.js";
import { ShopParamsSchema } from "../../domains/shop/validations/shop.validations.js";
import { asyncWrapper } from "../../shared/helpers/asyncWrapper.js";
import { validateRequest } from "../../shared/middlewares/validateRequest.middleware.js";
import { PaginationQuerySchema } from "../../shared/validations/pagination.validations.js";
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

/**
 * Find discounts by shop.
 */
router.get(
  "/shops/:shopId/discounts",
  validateRequest({
    params: ShopParamsSchema,
    query: PaginationQuerySchema,
  }),
  asyncWrapper(discountController.findDiscountsByShop),
);

export { router as discountRouter };
