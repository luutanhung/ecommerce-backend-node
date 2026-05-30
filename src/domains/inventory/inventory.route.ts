import { Router } from "express";

import { asyncWrapper } from "../../shared/helpers/asyncWrapper.js";
import { authenticateAccessToken } from "../access/middlewares/access.middleware.js";
import { authorizeShopOwnership } from "../shop/middlewares/shop.middleware.js";

import { inventoryController } from "./inventory.controller.js";

const router = Router();

router.use(authenticateAccessToken);

/**
 * Create a new inventory.
 */
router.post(
  "/shops/:shopId/inventories/create",
  authorizeShopOwnership,
  asyncWrapper(inventoryController.createInventory),
);

/**
 * Update an inventory.
 */
router.post(
  "/shops/:shopId/inventories/update",
  authorizeShopOwnership,
  asyncWrapper(inventoryController.updateInventory),
);

export { router as inventoryRouter };
