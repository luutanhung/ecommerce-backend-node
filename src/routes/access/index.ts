import { Router } from "express";

import { accessController } from "../../controllers/access.controller.js";

const router = Router();

router.post("/shop/signup", accessController.signUp);

export { router as accessRouter };
