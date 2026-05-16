import _ from "lodash";
import z from "zod";

import { ResponseCode } from "../constants/response.constant.js";

export const NameSchema = z.string({
  error: (issue) => {
    if (_.isUndefined(issue.input)) {
      return ResponseCode.NAME_REQUIRED;
    }

    if (typeof issue.input !== "string") {
      return ResponseCode.NAME_INVALID_TYPE;
    }
  },
});

export const EmailSchema = z
  .string({
    error: (issue) => {
      if (_.isUndefined(issue.input)) {
        return ResponseCode.EMAIL_REQUIRED;
      }

      return ResponseCode.EMAIL_INVALID_TYPE;
    },
  })
  .email({
    message: ResponseCode.EMAIL_INVALID,
  });

export const PasswordSchema = z
  .string({
    error: (issue) => {
      if (_.isUndefined(issue.input)) {
        return ResponseCode.PASSWORD_REQUIRED;
      }

      if (typeof issue.input !== "string") {
        return ResponseCode.PASSWORD_INVALID_TYPE;
      }
    },
  })
  .min(8, { message: ResponseCode.PASSWORD_TOO_SHORT })
  .regex(/[A-Z]/, {
    message: ResponseCode.PASSWORD_MISSING_UPPERCASE,
  })
  .regex(/[a-z]/, {
    message: ResponseCode.PASSWORD_MISSING_LOWERCASE,
  })
  .regex(/[0-9]/, { message: ResponseCode.PASSWORD_MISSING_NUMBER })
  .regex(/[^A-Za-z0-9]/, {
    message: ResponseCode.PASSWORD_MISSING_SPECIAL_CHAR,
  });
