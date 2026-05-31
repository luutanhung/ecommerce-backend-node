import { Router } from "express";

import { userController } from "../controllers/user.controller.js";

import { asyncWrapper } from "../../../shared/helpers/asyncWrapper.js";
import { validateRequest } from "../../../shared/middlewares/validateRequest.middleware.js";
import { AddAddressRequestBodySchema } from "../validations/user.validations.js";

const router = Router();

/**
 * Add new address.
 */
router.post(
  "/users/me/add-address",
  validateRequest({
    body: AddAddressRequestBodySchema,
  }),
  asyncWrapper(userController.addAddress),
);
