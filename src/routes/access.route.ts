import { Router } from "express";

import { accessController } from "../controllers/access.controller.js";

import { asyncWrapper } from "../middlewares/asyncWrapper.middleware.js";
import { validateRequest } from "../middlewares/validateRequest.middleware.js";
import {
  ShopLoginSchema,
  ShopRegisterSchema,
} from "../validations/access.schema.js";

const router = Router();

router.post(
  "/shop/register",
  validateRequest({ body: ShopRegisterSchema }),
  asyncWrapper(accessController.register),
);

router.post(
  "/shop/login",
  validateRequest({ body: ShopLoginSchema }),
  asyncWrapper(accessController.login),
);

export { router as accessRouter };
