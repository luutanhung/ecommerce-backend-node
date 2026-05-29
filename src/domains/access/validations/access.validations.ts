import _ from "lodash";
import z from "zod";

import { ResCode } from "../../../shared/constants/resCode.constants.js";
import {
  EmailSchema,
  PasswordSchema,
} from "../../../shared/validations/common.validations.js";

const DeviceIdSchema = z.string().min(8);

export const RegisterRequestSchema = z.object({
  email: EmailSchema,
  password: PasswordSchema,
});

export const SendVerificationEmailRequestBodySchema = z.object({
  uid: z.string(),
});
export type SendVerificationEmailRequestBody = z.infer<
  typeof SendVerificationEmailRequestBodySchema
>;

export type RegisterRequest = z.infer<typeof RegisterRequestSchema>;

export const LoginRequestSchema = z.object({
  email: EmailSchema,
  password: PasswordSchema,
  deviceId: DeviceIdSchema,
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
