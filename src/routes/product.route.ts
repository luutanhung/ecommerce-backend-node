import { Router } from "express";

import { asyncWrapper } from "../shared/helpers/asyncWrapper.js";
import { validateRequest } from "../shared/middlewares/validateRequest.middleware.js";

import { authenticateAccessToken } from "../domains/access/middlewares/access.middleware.js";
import { authorizeShopOwnership } from "../domains/shop/middlewares/shop.middleware.js";

import { productController } from "../controllers/product.controller.js";

import {
  CreateProductRequestSchema,
  ProductParamsSchema,
} from "../validations/product.validations.js";
import { ShopParamsSchema } from "../validations/shop.validations.js";

const router = Router();

router.use(authenticateAccessToken);

/**
 * Create a new product.
 */
router.post(
  "/shops/:shopId/products/create",
  validateRequest({
    params: ShopParamsSchema,
  }),
  authorizeShopOwnership,
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
