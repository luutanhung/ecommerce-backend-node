import type { NextFunction, Request, Response } from "express";

import { NotFoundAppError } from "../core/error/notFoundAppError.js";

import { asyncWrapper } from "../shared/helpers/asyncWrapper.js";

export const handleNotFound = asyncWrapper(
  // eslint-disable-next-line
  async (req: Request, res: Response, next: NextFunction) => {
    throw new NotFoundAppError({});
  },
);
