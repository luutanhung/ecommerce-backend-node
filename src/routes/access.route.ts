import { Router } from "express";

import { accessController } from "../controllers/access.controller.js";

import { asyncWrapper } from "../middlewares/asyncWrapper.middleware.js";
import { validateRequest } from "../middlewares/validateRequest.middleware.js";
import { ShopSignUpSchema } from "../validations/access.schema.js";

const router = Router();

router.post(
  "/shop/signup",
  validateRequest({ body: ShopSignUpSchema }),
  asyncWrapper(accessController.signUp),
);

export { router as accessRouter };
