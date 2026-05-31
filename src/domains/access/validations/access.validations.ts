import _ from "lodash";
import z from "zod";

import { ResCode } from "../../../shared/constants/resCode.constants.js";
import { EmailSchema } from "../../../shared/validations/common.validations.js";

import { UserPasswordSchema } from "./user.validations.js";

const DeviceIdSchema = z.uuid({
  error: ResCode.ACCESS_DEVICE_ID_INVALID,
});

export const RegisterRequestSchema = z.object({
  email: EmailSchema,
  password: UserPasswordSchema,
});

export const SendVerificationEmailRequestBodySchema = z.object({
  uid: z.string(),
});
export type SendVerificationEmailRequestBody = z.infer<
  typeof SendVerificationEmailRequestBodySchema
>;

export const VerifyEmailRequestBodySchema = z.object({
  token: z.string().min(1),
});
export type VerifyEmailRequestBody = z.infer<
  typeof VerifyEmailRequestBodySchema
>;

export type RegisterRequest = z.infer<typeof RegisterRequestSchema>;

export const LoginRequestSchema = z.object({
  email: EmailSchema,
  password: UserPasswordSchema,
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
