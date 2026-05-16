import { Router } from "express";

// import { authenticateApiKey } from "../auth/auth.middleware.js";
import { handleError } from "../error/errorHandler.middleware.js";

import { accessRouter } from "./access/index.js";

const router = Router();

// Authenticate API Key.
// router.use(authenticateApiKey);

router.use("/v1/api", accessRouter);

// Universal error handler.
router.use(handleError);

export { router as mainRouter };
