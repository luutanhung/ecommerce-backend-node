import _ from "lodash";
import z from "zod";

import { ResCode } from "../../../shared/constants/resCode.constants.js";
import {
  createJwtTokenSchema,
  createObjectIdSchema,
  createRequiredStringSchema,
} from "../../../shared/validations/common.validations.js";

export const ShopIdSchema = createObjectIdSchema({
  requiredMessage: ResCode.SHOP_ID_REQUIRED,
  invalidMessage: ResCode.SHOP_ID_INVALID,
});

export const ShopNameSchema = createRequiredStringSchema({
  requiredMessage: ResCode.SHOP_NAME_REQUIRED,
  invalidMessage: ResCode.SHOP_NAME_INVALID_TYPE,
})
  .min(8, {
    error: ResCode.SHOP_NAME_TOO_SHORT,
  })
  .max(150, {
    error: ResCode.SHOP_NAME_EXCEEDED_MAX_LENGTH,
  });

export const ShopSlugSchema = z.string();
export const ShopDescriptionSchema = z.string().min(0).max(500);

export const BaseShopSchema = z.object({
  name: ShopNameSchema,

  slug: ShopSlugSchema.optional(),

  description: ShopDescriptionSchema.optional(),
});

export const ShopParamsSchema = z.object({
  shopId: ShopIdSchema,
});
export type ShopParams = z.infer<typeof ShopParamsSchema>;

export const RegisterShopRequestBodySchema = BaseShopSchema;
export type RegisterShopRequestBody = z.infer<
  typeof RegisterShopRequestBodySchema
>;

export const UpdateShopInformationRequestBodySchema =
  BaseShopSchema.partial().refine(
    (data) => {
      return !_.isEmpty(data);
    },
    {
      message: ResCode.SHOP_UPDATE_INFORMATION_EMPTY,
    },
  );
export type UpdateShopInformationRequestBody = z.infer<
  typeof UpdateShopInformationRequestBodySchema
>;

export const VerifyShopRequestBodySchema = z.object({
  token: createJwtTokenSchema({
    requiredMessage: ResCode.SHOP_VERIFY_EMAIL_TOKEN_REQUIRED,
    invalidMessage: ResCode.SHOP_VERIFY_EMAIL_TOKEN_INVALID,
  }),
});
export type VerifyShopRequestBody = z.infer<typeof VerifyShopRequestBodySchema>;
