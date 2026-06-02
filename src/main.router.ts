import { Router } from "express";

// import { authenticateApiKey } from "../auth/auth.middleware.js";

import { accessRouter } from "./domains/access/routes/access.route.js";
import { userRouter } from "./domains/access/routes/user.route.js";
import { cartRouter } from "./domains/cart/cart.route.js";
import { inventoryRouter } from "./domains/inventory/inventory.route.js";
import { orderRouter } from "./domains/order/order.route.js";
import { paymentRouter } from "./domains/payment/payment.router.js";
import { discountRouter } from "./domains/pricing/routes/discount.route.js";
import { productRouter } from "./domains/product/routes/product.route.js";
import { addressRouter } from "./domains/shipping/routers/address.router.js";
import { shopRouter } from "./domains/shop/routers/shop.router.js";

const router = Router();

// Authenticate API Key.
// router.use(authenticateApiKey);

// ==========================================
// CONTAIN PUBLIC ROUTES (No Authentication Required)
// ==========================================
router.use("/api/v1", productRouter);
router.use("/api/v1", accessRouter);
router.use("/api/v1", paymentRouter);

// ==========================================
// CONTAIN PROTECTED ROUTES (No Authentication Required)
// ==========================================
router.use("/api/v1", addressRouter);
router.use("/api/v1", userRouter);
router.use("/api/v1", shopRouter);
router.use("/api/v1", inventoryRouter);
router.use("/api/v1", discountRouter);
router.use("/api/v1/", cartRouter);
router.use("/api/v1", orderRouter);

export { router as mainRouter };
