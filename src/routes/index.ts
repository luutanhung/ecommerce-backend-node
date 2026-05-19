import { Router } from "express";

// import { authenticateApiKey } from "../auth/auth.middleware.js";

import { accessRouter } from "./access.route.js";
import { productRouter } from "./product.route.js";
import { shopRouter } from "./shop.route.js";

const router = Router();

// Authenticate API Key.
// router.use(authenticateApiKey);

/**
 * Register routers.
 */
router.use("/v1/api", accessRouter);
router.use("/v1/api", productRouter);
router.use("/v1/api", shopRouter);

export { router as mainRouter };
