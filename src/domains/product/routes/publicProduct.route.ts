import { Router } from "express";

import { publicProductController } from "../controllers/publicProduct.controller.js";

import { asyncWrapper } from "../../../shared/helpers/asyncWrapper.js";
import { validateRequest } from "../../../shared/middlewares/validateRequest.middleware.js";
import { ShopParamsSchema } from "../../shop/validations/shop.validations.js";
import {
  FindPublishedProductsSchema,
  SearchPublishedProductRequestSchema,
} from "../validations/product.validations.js";

const router = Router();

/**
 * Search published products across shop.
 */
router.get(
  "/products/search",
  validateRequest({
    query: SearchPublishedProductRequestSchema,
  }),
  asyncWrapper(publicProductController.searchPublishedProducts),
);

/**
 * Find all published products by shop.
 */
router.get(
  "/shops/:shopId/products",
  validateRequest({
    params: ShopParamsSchema,
  }),
  asyncWrapper(publicProductController.findPublishedProductsByShop),
);

/**
 * Find all published product across shops.
 */
router.get(
  "/products",
  validateRequest({
    query: FindPublishedProductsSchema,
  }),
  asyncWrapper(publicProductController.findPublishedProducts),
);

export { router as publicProductRouter };
