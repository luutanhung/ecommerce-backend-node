import { Router } from "express";

import { addressController } from "../controllers/address.controller.js";

import { asyncWrapper } from "../../../shared/helpers/asyncWrapper.js";
import { authenticateAccessToken } from "../../access/middlewares/access.middleware.js";

const router = Router();

router.use(authenticateAccessToken);

/**
 * Get provinces from Vietnam's new provincial system.
 */
router.get(
  "/addresses/provinces",
  asyncWrapper(addressController.getProvinces),
);

export { router as addressRouter };
