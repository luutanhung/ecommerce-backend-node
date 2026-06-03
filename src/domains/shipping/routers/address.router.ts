import { Router } from "express";

import { addressController } from "../controllers/address.controller.js";

import { asyncWrapper } from "../../../shared/helpers/asyncWrapper.js";
import { validateRequest } from "../../../shared/middlewares/validateRequest.middleware.js";
import { authenticateAccessToken } from "../../access/middlewares/access.middleware.js";
import { GetWardsQuerySchema } from "../validations/address.validations.js";

const router = Router();

router.use(authenticateAccessToken);

/**
 * Get provinces from Vietnam's new provincial system.
 */
router.get(
  "/addresses/provinces",
  asyncWrapper(addressController.getProvinces),
);

/**
 * Get wards from Vietnam's new provincial system.
 */
router.get(
  "/addresses/wards",
  validateRequest({
    query: GetWardsQuerySchema,
  }),
  asyncWrapper(addressController.getWards),
);

export { router as addressRouter };
