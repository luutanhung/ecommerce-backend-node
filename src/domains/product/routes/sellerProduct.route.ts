import { Router } from "express";

import { sellerProductController } from "../controllers/sellerProduct.controller.js";

import { asyncWrapper } from "../../../shared/helpers/asyncWrapper.js";
import { validateRequest } from "../../../shared/middlewares/validateRequest.middleware.js";
import { authenticateAccessToken } from "../../access/middlewares/access.middleware.js";
import { authorizeShopOwnership } from "../../shop/middlewares/shop.middleware.js";
import { ShopParamsSchema } from "../../shop/validations/shop.validations.js";
import {
  CreateProductRequestSchema,
  ProductParamsSchema,
} from "../validations/product.validations.js";

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
 * Create a new shop product.
 */
router.post(
  "/shops/:shopId/products/create",
  validateRequest({ body: CreateProductRequestSchema }),
  asyncWrapper(sellerProductController.createShopProduct),
);

/**
 * Update a shop product.
 */
router.patch(
  "/shops/:shopId/products/:productId/update",
  validateRequest({
    params: ProductParamsSchema,
  }),
  asyncWrapper(sellerProductController.updateShopProduct),
);

/**
 * Publish a single product owned by shop.
 */
router.post(
  "/shops/:shopId/products/:productId/publish",
  validateRequest({
    params: ProductParamsSchema,
  }),
  asyncWrapper(sellerProductController.publishShopProduct),
);

/**
 * Unpublish a shop product owned by shop.
 */
router.post(
  "/shops/:shopId/products/:productId/unpublish",
  validateRequest({
    params: ProductParamsSchema,
  }),
  asyncWrapper(sellerProductController.unpublishShopProduct),
);

/**
 * Find all draft products owned by shop.
 */
router.get(
  "/shops/:shopId/products/draft",
  asyncWrapper(sellerProductController.findDraftProductsOwnedByShop),
);

/**
 * Find all published products owned by shop.
 */
router.get(
  "/shops/:shopId/products/published",
  asyncWrapper(sellerProductController.findPublishedProductsOwnedByShop),
);

/**
 * Find a single product owned by shop.
 */
router.get(
  "/shops/:shopId/products/:productId",
  validateRequest({
    params: ProductParamsSchema,
  }),
  asyncWrapper(sellerProductController.findProductOwnedByShop),
);

export { router as sellerProductRouter };
