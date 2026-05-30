import type { NextFunction, Request, Response } from "express";

import { Users } from "../models/user.model.js";

import { NotFoundAppError } from "../../../core/error/notFoundAppError.js";
import { ResCode } from "../../../shared/constants/resCode.constants.js";
import { asyncWrapper } from "../../../shared/helpers/asyncWrapper.js";
import { toObjectId } from "../../../shared/utils/mongoose.utils.js";

/**
 * Ensure user has already registered.
 */
export const ensureUserRegistered = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.userId || req.body.userId;

    const user = await Users.findOne({ _id: toObjectId(userId) });

    if (!user) {
      throw new NotFoundAppError({
        code: ResCode.USER_NOT_FOUND,
      });
    }

    return next();
  },
);
