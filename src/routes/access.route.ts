import { Router } from "express";

import { accessController } from "../controllers/access.controller.js";

import { asyncWrapper } from "../middlewares/asyncWrapper.middleware.js";

const router = Router();

router.post("/shop/signup", asyncWrapper(accessController.signUp));

export { router as accessRouter };
