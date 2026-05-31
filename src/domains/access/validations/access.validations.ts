import z from "zod";

import { ResCode } from "../../../shared/constants/resCode.constants.js";
import {
  EmailSchema,
  createJwtTokenSchema,
} from "../../../shared/validations/common.validations.js";

import { UserIdSchema, UserPasswordSchema } from "./user.validations.js";

const DeviceIdSchema = z.uuid({
  error: ResCode.ACCESS_DEVICE_ID_INVALID,
});

export const RefreshTokenSchema = createJwtTokenSchema({
  requiredMessage: ResCode.REFRESH_TOKEN_REQUIRED,
  invalidMessage: ResCode.REFRESH_TOKEN_INVALID,
});

export const RegisterRequestSchema = z.object({
  email: EmailSchema,
  password: UserPasswordSchema,
});

export const SendVerificationEmailRequestBodySchema = z.object({
  uid: UserIdSchema,
});
export type SendVerificationEmailRequestBody = z.infer<
  typeof SendVerificationEmailRequestBodySchema
>;

export const VerifyEmailRequestBodySchema = z.object({
  token: createJwtTokenSchema({
    requiredMessage: ResCode.ACCESS_VERIFY_EMAIL_TOKEN_REQUIRED,
    invalidMessage: ResCode.ACCESS_VERIFY_EMAIL_TOKEN_INVALID,
  }),
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
  refreshToken: RefreshTokenSchema,
});

export type RefreshTokenRequest = z.infer<typeof RefreshTokenRequestSchema>;
