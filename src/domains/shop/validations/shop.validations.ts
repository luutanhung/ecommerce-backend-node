import _ from "lodash";
import z from "zod";

import { ResCode } from "../../../shared/constants/resCode.constants.js";
import { ObjectIdSchema } from "../../../shared/validations/common.validations.js";

export const ShopParamsSchema = z.object({
  shopId: ObjectIdSchema,
});
export type ShopParams = z.infer<typeof ShopParamsSchema>;

export const BaseShopSchema = z.object({
  name: z
    .string({
      error: (issue) => {
        const value = issue.input;

        if (_.isUndefined(value)) {
          return ResCode.SHOP_NAME_REQUIRED;
        }
        if (!_.isString(value)) {
          return ResCode.SHOP_NAME_INVALID_TYPE;
        }
      },
    })
    .trim() // Remove leading/trailing whitespace before validation.
    .min(8, {
      error: ResCode.SHOP_NAME_TOO_SHORT,
    })
    .max(150, {
      error: ResCode.SHOP_NAME_EXCEEDED_MAX_LENGTH,
    }),
  slug: z.string().optional(),
  description: z.string().optional(),
});

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
