import { Router } from "express";

// import { authenticateApiKey } from "../auth/auth.middleware.js";

import { accessRouter } from "./domains/access/routes/access.route.js";
import { publicProductRouter } from "./domains/product/routes/publicProduct.route.js";
import { sellerProductRouter } from "./domains/product/routes/sellerProduct.route.js";
import { shopRouter } from "./domains/shop/routes/shop.route.js";

const router = Router();

// Authenticate API Key.
// router.use(authenticateApiKey);

/**
 * Register access routes.
 */

router.use("/api/v1", accessRouter);

/**
 * Register shop routes.
 */
router.use("/api/v1", shopRouter);
router.use("/api/v1", publicProductRouter);

/**
 * Register product routes.
 */
router.use("/api/v1", sellerProductRouter);

export { router as mainRouter };
