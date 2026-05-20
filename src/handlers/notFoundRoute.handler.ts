import type { NextFunction, Request, Response } from "express";

import { NotFoundAppError } from "../core/error/notFoundAppError.js";

import { asyncWrapper } from "../shared/helpers/asyncWrapper.js";

export const handleNotFoundRoute = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    return next(new NotFoundAppError({}));
  },
);
