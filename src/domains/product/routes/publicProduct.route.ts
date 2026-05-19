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

router.use(
  "/shops/:shopId",
  validateRequest({
    params: ShopParamsSchema,
  }),
  authorizeShopOwnership,
);

/**
 * Create a new product.
 */
router.post(
  "/shops/:shopId/products/create",
  validateRequest({ body: CreateProductRequestSchema }),
  asyncWrapper(productController.createProductByShop),
);

/**
 * Publish a single product.
 */
router.post(
  "/shops/:shopId/products/:productId/publish",
  validateRequest({
    params: ProductParamsSchema,
  }),
  asyncWrapper(productController.publishProductByShop),
);

/**
 * Unpublish a single product.
 */
router.post(
  "/shops/:shopId/products/:productId/unpublish",
  validateRequest({
    params: ProductParamsSchema,
  }),
  asyncWrapper(productController.unpublishProductByShop),
);

/**
 * Find all draft products.
 */
router.get(
  "/shops/:shopId/products/draft",
  asyncWrapper(productController.findDraftProductsByShop),
);

/**
 * Find all published products.
 */
router.get(
  "/shops/:shopId/products/published",
  asyncWrapper(productController.findPublishedProductsByShop),
);

/**
 * Find a single product.
 */
router.get(
  "/shops/:shopId/products/:productId",
  validateRequest({
    params: ProductParamsSchema,
  }),
  asyncWrapper(productController.findProductByShop),
);

export { router as productRouter };
