import { Router } from "express";

// import { authenticateApiKey } from "../auth/auth.middleware.js";

import { accessRouter } from "./domains/access/routes/access.route.js";
import { userRouter } from "./domains/access/routes/user.route.js";
import { cartRouter } from "./domains/cart/cart.route.js";
import { inventoryRouter } from "./domains/inventory/inventory.route.js";
import { orderRouter } from "./domains/order/order.route.js";
import { productRouter } from "./domains/product/routes/product.route.js";
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
 * Register user routes.
 */
router.use("/api/v1", userRouter);

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
router.use("/api/v1", productRouter);

/**
 * Register pricing routes.
 */
router.use("/api/v1", discountRouter);

/**
 * Register cart routes.
 */
router.use("/api/v1/", cartRouter);

/**
 * Register order routes.
 */
router.use("/api/v1", orderRouter);

export { router as mainRouter };
