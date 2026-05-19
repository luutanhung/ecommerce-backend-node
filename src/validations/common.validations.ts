import _ from "lodash";
import mongoose from "mongoose";
import z from "zod";

import { ResCode } from "../constants/resCode.constants.js";

export const ObjectIdSchema = z
  .string()
  .refine(mongoose.Types.ObjectId.isValid, {
    message: ResCode.INVALID_ID,
  });

export const NameSchema = z.string({
  error: (issue) => {
    if (_.isUndefined(issue.input)) {
      return ResCode.NAME_REQUIRED;
    }

    if (typeof issue.input !== "string") {
      return ResCode.NAME_INVALID_TYPE;
    }
  },
});

export const EmailSchema = z
  .string({
    error: (issue) => {
      if (_.isUndefined(issue.input)) {
        return ResCode.EMAIL_REQUIRED;
      }

      return ResCode.EMAIL_INVALID_TYPE;
    },
  })
  .email({
    message: ResCode.EMAIL_INVALID,
  });

export const PasswordSchema = z
  .string({
    error: (issue) => {
      if (_.isUndefined(issue.input)) {
        return ResCode.PASSWORD_REQUIRED;
      }

      if (typeof issue.input !== "string") {
        return ResCode.PASSWORD_INVALID_TYPE;
      }
    },
  })
  .min(8, { message: ResCode.PASSWORD_TOO_SHORT })
  .regex(/[A-Z]/, {
    message: ResCode.PASSWORD_MISSING_UPPERCASE,
  })
  .regex(/[a-z]/, {
    message: ResCode.PASSWORD_MISSING_LOWERCASE,
  })
  .regex(/[0-9]/, { message: ResCode.PASSWORD_MISSING_NUMBER })
  .regex(/[^A-Za-z0-9]/, {
    message: ResCode.PASSWORD_MISSING_SPECIAL_CHAR,
  });

export const PositiveNumberSchema = (
  invalidTypeMessage: string,
  positiveMessage: string,
) => {
  return z
    .number({
      error: invalidTypeMessage,
    })
    .positive({
      error: positiveMessage,
    });
};
