import { Router } from "express";

import { addressController } from "../controllers/address.controller.js";

import { asyncWrapper } from "../../../shared/helpers/asyncWrapper.js";
import { validateRequest } from "../../../shared/middlewares/validateRequest.middleware.js";
import { authenticateAccessToken } from "../../access/middlewares/access.middleware.js";
import {
  GetDistrictsSchema,
  GetWardsQuerySchema,
} from "../validations/address.validations.js";

const router = Router();

/**
 * Get provinces from Vietnam's old provincial system.
 */
router.get(
  "/addresses/provinces",
  authenticateAccessToken,
  asyncWrapper(addressController.getProvinces),
);

/**
 * Get districts from Vietnam's old provincial system.
 */
router.get(
  "/addresses/districts",
  validateRequest({
    query: GetDistrictsSchema,
  }),
  authenticateAccessToken,
  asyncWrapper(addressController.getDistricts),
);

/**
 * Get wards from Vietnam's old provincial system.
 */
router.get(
  "/addresses/wards",
  validateRequest({
    query: GetWardsQuerySchema,
  }),
  authenticateAccessToken,
  asyncWrapper(addressController.getWards),
);

export { router as addressRouter };
