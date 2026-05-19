import { Router } from "express";

// import { authenticateApiKey } from "../auth/auth.middleware.js";

import { accessRouter } from "./domains/access/routes/access.route.js";
import { sellerProductRouter } from "./domains/product/routes/sellerProduct.route.js";
import { shopRouter } from "./domains/shop/routes/shop.route.js";

const router = Router();

// Authenticate API Key.
// router.use(authenticateApiKey);

/**
 * Register access routes.
 */

router.use("/v1/api", accessRouter);

/**
 * Register shop routes.
 */
router.use("/v1/api", shopRouter);

/**
 * Register product routes.
 */
router.use("/v1/api", sellerProductRouter);

export { router as mainRouter };
