import { z } from "zod";

import { ResCode } from "../../../shared/constants/resCode.constants.js";
import {
  createObjectIdSchema,
  createRequiredStringSchema,
} from "../../../shared/validations/common.validations.js";

export const UserIdSchema = createObjectIdSchema({
  requiredMessage: ResCode.USER_ID_REQUIRED,
  invalidMessage: ResCode.USER_ID_INVALID,
});

export const UserNameSchema = createRequiredStringSchema({
  requiredMessage: ResCode.USER_NAME_REQUIRED,
  invalidMessage: ResCode.USER_NAME_INVALID_TYPE,
});

export const UserPasswordSchema = createRequiredStringSchema({
  requiredMessage: ResCode.PASSWORD_REQUIRED,
  invalidMessage: ResCode.PASSWORD_INVALID,
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

export const UserAddressLineSchema = createRequiredStringSchema({
  requiredMessage: ResCode.USER_ADDRESS_REQUIRED,
  invalidMessage: ResCode.USER_ADDRESS_INVALID,
}).max(500, {
  error: ResCode.USER_ADDRESS_INVALID,
});

export const UserWardSchema = z.string();
export const UserDistrictSchema = z.string();
export const UserProvince = z.string();

export const UserAddressSchema = z.object({
  addressLine: UserAddressLineSchema,
  isPrimary: z.boolean().optional(),
  ward: UserWardSchema.optional(),
  district: UserDistrictSchema.optional(),
  province: UserProvince.optional(),
});

export const UserParamsSchema = z.object({
  userId: UserIdSchema,
});
export type UserParams = z.infer<typeof UserParamsSchema>;

export const AddAddressBodySchema = UserAddressSchema;
export type AddAddressBody = z.infer<typeof AddAddressBodySchema>;
