import { Router } from "express";

import { authenticateAccessToken } from "../domains/access/middlewares/access.middleware.js";

import { productController } from "../controllers/product.controller.js";

import { asyncWrapper } from "../helpers/asyncWrapper.js";
import { validateRequest } from "../middlewares/validateRequest.middleware.js";
import {
  CreateProductRequestSchema,
  ProductParamsSchema,
} from "../validations/product.validations.js";

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
 * Publish a single product.
 */
router.post(
  "/products/:productId/publish",
  validateRequest({
    params: ProductParamsSchema,
  }),
  asyncWrapper(productController.publishProduct),
);

/**
 * Unpublish a single product.
 */
router.post(
  "/products/:productId/unpublish",
  validateRequest({
    params: ProductParamsSchema,
  }),
  asyncWrapper(productController.unpublishProduct),
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

/**
 * Find a single product.
 */
router.get(
  "/products/:productId",
  validateRequest({
    params: ProductParamsSchema,
  }),
  asyncWrapper(productController.findProductByShopId),
);

export { router as productRouter };
