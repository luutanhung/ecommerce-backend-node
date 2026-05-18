import { Router } from "express";

import { productController } from "../controllers/product.controller.js";

import { asyncWrapper } from "../helpers/asyncWrapper.js";
import { authenticateAccessToken } from "../middlewares/access.middleware.js";
import { validateRequest } from "../middlewares/validateRequest.middleware.js";
import { CreateProductSchema } from "../validations/product.validations.js";

const router = Router();

router.use(authenticateAccessToken);

// Create a new product.
router.post(
  "/product/create",
  authenticateAccessToken,
  validateRequest({ body: CreateProductSchema }),
  asyncWrapper(productController.createProduct),
);

export { router as productRouter };
