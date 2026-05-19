import { Router } from "express";

import { publicProductController } from "../controllers/publicProduct.controller.js";

import { asyncWrapper } from "../../../shared/helpers/asyncWrapper.js";
import { validateRequest } from "../../../shared/middlewares/validateRequest.middleware.js";
import { ShopParamsSchema } from "../../shop/validations/shop.validations.js";

const router = Router();

/**
 * Find all published products by shop.
 */
router.get(
  "/shops/:shopId/products",
  validateRequest({
    params: ShopParamsSchema,
  }),
  asyncWrapper(publicProductController.findPublishedProducts),
);

export { router as publicProductRouter };
