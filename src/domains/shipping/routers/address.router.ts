import { Router } from "express";

import { addressController } from "../controllers/address.controller.js";

import { asyncWrapper } from "../../../shared/helpers/asyncWrapper.js";

const router = Router();

/**
 * Get provinces from Vietnam's new provincial system.
 */
router.get(
  "/addresses/provinces",
  asyncWrapper(addressController.getProvinces),
);

export { router as addressRouter };
