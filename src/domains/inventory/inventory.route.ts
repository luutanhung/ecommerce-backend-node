import { Router } from "express";

import { asyncWrapper } from "../../shared/helpers/asyncWrapper.js";
import { authenticateAccessToken } from "../access/middlewares/access.middleware.js";
import { authorizeShopOwnership } from "../shop/middlewares/shop.middleware.js";

import { inventoryController } from "./inventory.controller.js";

const router = Router();

router.use(authenticateAccessToken);
router.use(authorizeShopOwnership);

router.post(
  "/shops/:shopId/inventories/create",
  asyncWrapper(inventoryController.createInventory),
);

export { router as inventoryRouter };
