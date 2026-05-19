import { Router } from "express";

import { publicProductController } from "../controllers/publicProduct.controller.js";

import { asyncWrapper } from "../../../shared/helpers/asyncWrapper.js";
import { validateRequest } from "../../../shared/middlewares/validateRequest.middleware.js";
import { ShopParamsSchema } from "../../shop/validations/shop.validations.js";
import { SearchPublishedProductRequestSchema } from "../validations/product.validations.js";

const router = Router();

/**
 * Search published products across shop.
 */
router.get(
  "/products",
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

export { router as publicProductRouter };
