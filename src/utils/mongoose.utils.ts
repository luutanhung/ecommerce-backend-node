import type { Types } from "mongoose";
import mongoose from "mongoose";

import { BadRequestAppError } from "../core/error/badRequestAppError.js";

import { ResCode } from "../constants/resCode.constants.js";

/**
 * Convert string value to ObjectId.
 */
export const toObjectId = (value: string): Types.ObjectId => {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    throw new BadRequestAppError({
      code: ResCode.INVALID_OBJECT_ID,
    });
  }

  return new mongoose.Types.ObjectId(value);
};
