import { Router } from "express";

// import { authenticateApiKey } from "../auth/auth.middleware.js";

import { accessRouter } from "./access.route.js";

const router = Router();

// Authenticate API Key.
// router.use(authenticateApiKey);

router.use("/v1/api", accessRouter);

export { router as mainRouter };
