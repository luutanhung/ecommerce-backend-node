import type { Types } from "mongoose";
import mongoose from "mongoose";

import { SortOrder } from "../../constants/common.constants.js";
import { ResCode } from "../../constants/resCode.constants.js";
import { BadRequestAppError } from "../../core/error/badRequestAppError.js";
import type { SortOptions } from "../../types/common.type.js";

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

/**
 * Transform mongoose _id to id.
 */
export const transformMongoId = <
  T extends {
    _id: Types.ObjectId;
  },
>(
  obj: T,
): Omit<T, "_id"> & {
  id: string;
} => {
  const { _id, ...rest } = obj;

  return {
    ...rest,
    id: _id.toString(),
  };
};

/**
 * Transform sort options
 * to mongoose sort object.
 */
export function buildSort(options?: SortOptions): Record<string, number> {
  if (!options) {
    return {
      ctime: -1,
    };
  }

  const { sortBy, sortOrder } = options;

  return {
    [sortBy]: sortOrder === SortOrder.ASC ? 1 : -1,
  };
}

/**
 * Transform select options.
 */
export function buildSelect(
  selectFields: string[] = [],
): Record<string, number> {
  if (selectFields.length === 0) return {};

  const selectOptions: Record<string, number> = {};

  for (const field of selectFields) {
    selectOptions[field] = 1;
  }

  return selectOptions;
}
