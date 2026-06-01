import type { Types } from "mongoose";
import mongoose from "mongoose";

import { SortOrder } from "../constants/common.constants.js";
import { ResCode } from "../constants/resCode.constants.js";

import type { SortOptions } from "../types/common.type.js";

import { BadRequestAppError } from "../../core/error/badRequestAppError.js";

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
): Record<string, 1 | 0> {
  return selectFields.reduce<Record<string, 1 | 0>>((acc, field) => {
    const isExcluded = field.startsWith("-");

    const key = isExcluded ? field.slice(1) : field;

    acc[key] = isExcluded ? 0 : 1;

    return acc;
  }, {});
}

/**
 * Flatten object.
 */
export function flattenObject(
  obj: Record<string, unknown>,

  prefix = "",
): Record<string, unknown> {
  return Object.keys(obj).reduce(
    (
      acc,

      key,
    ) => {
      const prefixedKey = prefix ? `${prefix}.${key}` : key;

      const value = obj[key];

      if (
        typeof value === "object" &&
        value !== null &&
        !Array.isArray(value)
      ) {
        Object.assign(
          acc,

          flattenObject(
            value as Record<string, unknown>,

            prefixedKey,
          ),
        );
      } else {
        acc[prefixedKey] = value;
      }

      return acc;
    },

    {} as Record<string, unknown>,
  );
}
