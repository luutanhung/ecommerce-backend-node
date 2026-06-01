import { Router } from "express";

import { asyncWrapper } from "../../shared/helpers/asyncWrapper.js";
import { validateRequest } from "../../shared/middlewares/validateRequest.middleware.js";
import { authenticateAccessToken } from "../access/middlewares/access.middleware.js";
import { authorizeShopOwnership } from "../shop/middlewares/shop.middleware.js";
import { ShopParamsSchema } from "../shop/validations/shop.validations.js";

import { inventoryController } from "./inventory.controller.js";
import {
  DecreaseStockBodySchema,
  DecreaseStockParamsSchema,
  IncreaseStockBodySchema,
  IncreaseStockParamsSchema,
} from "./inventory.validations.js";

const router = Router();

router.use(authenticateAccessToken);

/**
 * Create a new inventory.
 */
router.post(
  "/shops/:shopId/inventories/create",
  validateRequest({
    params: ShopParamsSchema,
  }),
  authorizeShopOwnership,
  asyncWrapper(inventoryController.createInventory),
);

/**
 * Update an inventory.
 */
router.post(
  "/shops/:shopId/inventories/update",
  validateRequest({
    params: ShopParamsSchema,
  }),
  authorizeShopOwnership,
  asyncWrapper(inventoryController.updateInventory),
);

/**
 * Increase stock.
 */
router.post(
  "/shops/:shopId/inventories/:inventoryId/increase",
  validateRequest({
    params: IncreaseStockParamsSchema,
    body: IncreaseStockBodySchema,
  }),
  asyncWrapper(inventoryController.increaseStock),
);

/**
 * Decrease stock.
 */
router.post(
  "/shops/:shopId/inventories/:inventoryId/decrease",
  validateRequest({
    params: DecreaseStockParamsSchema,
    body: DecreaseStockBodySchema,
  }),
  asyncWrapper(inventoryController.decreaseStock),
);

export { router as inventoryRouter };
