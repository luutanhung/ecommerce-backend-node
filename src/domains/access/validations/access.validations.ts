import _ from "lodash";
import z from "zod";

import { ResCode } from "../../../constants/resCode.constants.js";
import {
  EmailSchema,
  PasswordSchema,
} from "../../../shared/validations/common.validations.js";

// const ShopNameSchema = NameSchema.min(2, {
//   message: ResCode.EMAIL_INVALID,
// });

export const RegisterRequestSchema = z.object({
  email: EmailSchema,
  password: PasswordSchema,
});

export type RegisterRequest = z.infer<typeof RegisterRequestSchema>;

export const LoginRequestSchema = z.object({
  email: EmailSchema,
  password: PasswordSchema,
});

export type LoginRequest = z.infer<typeof LoginRequestSchema>;

export const RefreshTokenRequestSchema = z.object({
  refreshToken: z
    .string({
      error: (issue) => {
        const refreshToken = issue.input;

        if (_.isUndefined(refreshToken)) {
          return ResCode.REFRESH_TOKEN_REQUIRED;
        }

        if (!_.isString(refreshToken)) {
          return ResCode.REFRESH_TOKEN_INVALID;
        }
      },
    })
    .min(1)
    .trim(),
});

export type RefreshTokenRequest = z.infer<typeof RefreshTokenRequestSchema>;
