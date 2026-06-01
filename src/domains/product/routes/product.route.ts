import { Router } from "express";

import { productController } from "../controllers/product.controller.js";

import { CreateShopDiscountRequestSchema } from "../../../pricing/validations/discount.validations.js";
import { asyncWrapper } from "../../../shared/helpers/asyncWrapper.js";
import { validateRequest } from "../../../shared/middlewares/validateRequest.middleware.js";
import { authenticateAccessToken } from "../../access/middlewares/access.middleware.js";
import { authorizeShopOwnership } from "../../shop/middlewares/shop.middleware.js";
import { ShopParamsSchema } from "../../shop/validations/shop.validations.js";
import {
  FindPublishedProductsSchema,
  ProductParamsSchema,
  SearchPublishedProductRequestSchema,
} from "../validations/product.validations.js";

const router = Router();

// ==========================================
// PUBLIC ROUTES (No Authentication Required)
// ==========================================
/**
 * Search published products across shop.
 */
router.get(
  "/public/products/search",
  validateRequest({
    query: SearchPublishedProductRequestSchema,
  }),
  asyncWrapper(productController.searchPublishedProducts),
);

/**
 * Find all published products by shop.
 */
router.get(
  "/public/shops/:shopId/products",
  validateRequest({
    params: ShopParamsSchema,
  }),
  asyncWrapper(productController.findPublishedProductsByShop),
);

/**
 * Find all published product across shops.
 */
router.get(
  "/public/products",
  validateRequest({
    query: FindPublishedProductsSchema,
  }),
  asyncWrapper(productController.findPublishedProducts),
);

/**
 * Find a single published product.
 */
router.get(
  "/public/products/:productId",
  validateRequest({
    params: ProductParamsSchema,
  }),
  asyncWrapper(productController.findPublishedProduct),
);

// ==========================================
// PROTECTED ROUTES (Authentication Required)
// ==========================================
router.use(
  "/shops/:shopId",
  validateRequest({
    params: ShopParamsSchema,
  }),
  authenticateAccessToken,
  authorizeShopOwnership,
);

/**
 * Create a new shop product.
 */
router.post(
  "/shops/:shopId/products/create",
  validateRequest({ body: CreateShopDiscountRequestSchema }),
  authenticateAccessToken,
  asyncWrapper(productController.createShopProduct),
);

/**
 * Update a shop product.
 */
router.patch(
  "/shops/:shopId/products/:productId/update",
  validateRequest({
    params: ProductParamsSchema,
  }),
  authenticateAccessToken,
  asyncWrapper(productController.updateShopProduct),
);

/**
 * Publish a single product owned by shop.
 */
router.post(
  "/shops/:shopId/products/:productId/publish",
  validateRequest({
    params: ProductParamsSchema,
  }),
  authenticateAccessToken,
  asyncWrapper(productController.publishShopProduct),
);

/**
 * Unpublish a shop product owned by shop.
 */
router.post(
  "/shops/:shopId/products/:productId/unpublish",
  validateRequest({
    params: ProductParamsSchema,
  }),
  authenticateAccessToken,
  asyncWrapper(productController.unpublishShopProduct),
);

/**
 * Find all draft products owned by shop.
 */
router.get(
  "/shops/:shopId/products/draft",
  authenticateAccessToken,
  asyncWrapper(productController.findDraftProductsOwnedByShop),
);

/**
 * Find all published products owned by shop.
 */
router.get(
  "/shops/:shopId/products/published",
  authenticateAccessToken,
  asyncWrapper(productController.findPublishedProductsOwnedByShop),
);

/**
 * Find a single product owned by shop.
 */
router.get(
  "/shops/:shopId/products/:productId",
  validateRequest({
    params: ProductParamsSchema,
  }),
  authenticateAccessToken,
  asyncWrapper(productController.findProductOwnedByShop),
);

export { router as productRouter };
