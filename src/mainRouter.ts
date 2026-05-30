import { Router } from "express";

// import { authenticateApiKey } from "../auth/auth.middleware.js";

import { accessRouter } from "./domains/access/routes/access.route.js";
import { cartRouter } from "./domains/cart/cart.route.js";
import { inventoryRouter } from "./domains/inventory/inventory.route.js";
import { publicProductRouter } from "./domains/product/routes/publicProduct.route.js";
import { sellerProductRouter } from "./domains/product/routes/sellerProduct.route.js";
import { shopRouter } from "./domains/shop/routes/shop.route.js";

import { discountRouter } from "./pricing/routes/discount.route.js";

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

/**
 * Register inventory routes.
 */
router.use("/api/v1", inventoryRouter);

/**
 * Register product routes.
 */
router.use("/api/v1", sellerProductRouter);
router.use("/api/v1", publicProductRouter);

/**
 * Register cart routes.
 */
router.use("/api/v1/", cartRouter);

/**
 * Register pricing routes.
 */
router.use("/api/v1", discountRouter);

export { router as mainRouter };
