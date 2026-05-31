import _ from "lodash";
import mongoose from "mongoose";
import z from "zod";

import { ResCode } from "../constants/resCode.constants.js";

import type {
  CreateObjectIdSchemaInput,
  CreatePositiveNumberSchemaInput,
  CreateRequiredStringSchemaInput,
} from "../types/validations/common.validations.types.js";

/**
 * Create schema for mongoose object id.
 */
export const createObjectIdSchema = ({
  requiredMessage,
  invalidMessage,
}: CreateObjectIdSchemaInput) => {
  return z
    .string({
      error: (issue) => {
        if (issue.input === undefined) {
          return requiredMessage;
        }

        if (typeof issue.input !== "string") {
          return invalidMessage;
        }
      },
    })
    .trim()
    .min(24, { message: invalidMessage })
    .refine((value) => mongoose.Types.ObjectId.isValid(value), {
      message: invalidMessage,
    });
};

export const createRequiredStringSchema = ({
  requiredMessage,
  invalidTypeMessage,
  trim = true,
}: CreateRequiredStringSchemaInput) => {
  let schema = z.string({
    error: (issue) => {
      const value = issue.input;

      if (_.isUndefined(value)) {
        return requiredMessage;
      }

      if (!_.isString(value)) {
        return invalidTypeMessage;
      }
    },
  });

  if (trim) {
    schema = schema.trim();
  }

  return schema;
};

export const EmailSchema = z.email({
  error: ResCode.EMAIL_INVALID,
});

/**
 * Create schema for positive number.
 */
export const createPositiveNumberSchema = ({
  invalidTypeMessage,
  positiveMessage,
}: CreatePositiveNumberSchemaInput) => {
  return z
    .number({
      error: invalidTypeMessage,
    })
    .positive({
      error: positiveMessage,
    });
};

export const SearchKeywordSchema = z.object({
  keyword: z.string().min(1).optional().default(""),
});

export const SortOrderSchema = z.object({
  sortOrder: z.enum(["asc", "desc"]).optional().default("desc"),
});
