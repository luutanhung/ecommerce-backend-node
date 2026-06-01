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

// Register a new account.
export const RegisterBodySchema = z.object({
  email: EmailSchema,
  password: UserPasswordSchema,
});
export type RegisterBody = z.infer<typeof RegisterBodySchema>;

// Send verification email.
export const SendVerificationEmailBodySchema = z.object({
  uid: UserIdSchema,
});
export type SendVerificationEmailBody = z.infer<
  typeof SendVerificationEmailBodySchema
>;

// Verify email.
export const VerifyEmailBodySchema = z.object({
  token: createJwtTokenSchema({
    requiredMessage: ResCode.ACCESS_VERIFY_EMAIL_TOKEN_REQUIRED,
    invalidMessage: ResCode.ACCESS_VERIFY_EMAIL_TOKEN_INVALID,
  }),
});
export type VerifyEmailBody = z.infer<typeof VerifyEmailBodySchema>;

export const LoginBodySchema = z.object({
  email: EmailSchema,
  password: UserPasswordSchema,
  deviceId: DeviceIdSchema,
});

export type LoginBody = z.infer<typeof LoginBodySchema>;
