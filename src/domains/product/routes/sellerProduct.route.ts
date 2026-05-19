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
 * Create a new product.
 */
router.post(
  "/shops/:shopId/products/create",
  validateRequest({ body: CreateProductRequestSchema }),
  asyncWrapper(sellerProductController.createProductByShop),
);

/**
 * Publish a single product.
 */
router.post(
  "/shops/:shopId/products/:productId/publish",
  validateRequest({
    params: ProductParamsSchema,
  }),
  asyncWrapper(sellerProductController.publishProductByShop),
);

/**
 * Unpublish a single product.
 */
router.post(
  "/shops/:shopId/products/:productId/unpublish",
  validateRequest({
    params: ProductParamsSchema,
  }),
  asyncWrapper(sellerProductController.unpublishProductByShop),
);

/**
 * Find all draft products.
 */
router.get(
  "/shops/:shopId/products/draft",
  asyncWrapper(sellerProductController.findDraftProductsByShop),
);

/**
 * Find all published products.
 */
router.get(
  "/shops/:shopId/products/published",
  asyncWrapper(sellerProductController.findPublishedProductsByShop),
);

/**
 * Find a single product.
 */
router.get(
  "/shops/:shopId/products/:productId",
  validateRequest({
    params: ProductParamsSchema,
  }),
  asyncWrapper(sellerProductController.findProductByShop),
);

export { router as sellerProductRouter };
