import { Router } from "express";

import { productController } from "../controllers/product.controller.js";

import { asyncWrapper } from "../helpers/asyncWrapper.js";
import { authenticateAccessToken } from "../middlewares/access.middleware.js";
import { validateRequest } from "../middlewares/validateRequest.middleware.js";
import { CreateProductRequestSchema } from "../validations/product.validations.js";

const router = Router();

router.use(authenticateAccessToken);

/**
 * Create a new product.
 */
router.post(
  "/products/create",
  validateRequest({ body: CreateProductRequestSchema }),
  asyncWrapper(productController.createProduct),
);

/**
 * Find all draft products.
 */
router.get(
  "/products/draft",
  asyncWrapper(productController.findDraftProductsByShopId),
);

/**
 * Find all published products.
 */
router.get(
  "/products/published",
  asyncWrapper(productController.findPublishedProductsByShopId),
);

export { router as productRouter };
