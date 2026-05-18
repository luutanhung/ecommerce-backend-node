import _ from "lodash";
import z from "zod";

import { ResCode } from "../constants/resCode.constants.js";

import {
  EmailSchema,
  NameSchema,
  PasswordSchema,
} from "./common.validations.js";

const ShopNameSchema = NameSchema.min(2, {
  message: ResCode.EMAIL_INVALID,
});

export const RegisterShopRequestSchema = z.object({
  name: ShopNameSchema,
  email: EmailSchema,
  password: PasswordSchema,
});

export type RegisterShopRequest = z.infer<typeof RegisterShopRequestSchema>;

export const LoginShopRequestSchema = z.object({
  email: EmailSchema,
  password: PasswordSchema,
});

export type LoginShopRequest = z.infer<typeof LoginShopRequestSchema>;

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
