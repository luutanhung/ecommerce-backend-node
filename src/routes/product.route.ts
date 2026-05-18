import { Router } from "express";

import { productController } from "../controllers/product.controller.js";

import { asyncWrapper } from "../helpers/asyncWrapper.js";
import { authenticateAccessToken } from "../middlewares/access.middleware.js";

const router = Router();

router.use(authenticateAccessToken);

// Create a new product.
router.post(
  "/product/create",
  authenticateAccessToken,
  asyncWrapper(productController.createProduct),
);

export { router as productRouter };
