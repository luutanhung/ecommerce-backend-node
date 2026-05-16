import z from "zod";

import { ResponseCode } from "../constants/response.constant.js";

import { EmailSchema, NameSchema, PasswordSchema } from "./common.schema.js";

const ShopNameSchema = NameSchema.min(2, {
  message: ResponseCode.EMAIL_INVALID,
});

export const ShopSignUpSchema = z.object({
  name: ShopNameSchema,
  email: EmailSchema,
  password: PasswordSchema,
});

export type ShopSignUpPayload = z.infer<typeof ShopSignUpSchema>;
