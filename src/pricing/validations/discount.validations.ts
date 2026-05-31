import { z } from "zod";

import {
  DISCOUNT_APPLIES_TO,
  DISCOUNT_TYPE,
} from "../constants/discount.constants.js";

import { ProductType } from "../../domains/product/constants/product.constants.js";
import { ResCode } from "../../shared/constants/resCode.constants.js";
import {
  createObjectIdSchema,
  createRequiredStringSchema,
} from "../../shared/validations/common.validations.js";
import { PaginationQuerySchema } from "../../shared/validations/pagination.validations.js";

export const DiscountIdSchema = createObjectIdSchema({
  requiredMessage: ResCode.DISCOUNT_ID_REQUIRED,
  invalidMessage: ResCode.DISCOUNT_CODE_INVALID,
});

export const DiscountCodeSchema = createRequiredStringSchema({
  requiredMessage: ResCode.DISCOUNT_CODE_REQUIRED,
  invalidMessage: ResCode.DISCOUNT_CODE_INVALID,
})
  .min(3, {
    error: ResCode.DISCOUNT_CODE_INVALID,
  })
  .max(50, {
    error: ResCode.DISCOUNT_CODE_INVALID,
  })
  .transform((v) => v.toUpperCase());

export const DiscountNameSchema = createRequiredStringSchema({
  requiredMessage: ResCode.DISCOUNT_NAME_REQUIRED,
  invalidMessage: ResCode.DISCOUNT_NAME_INVALID,
})
  .min(1)
  .max(150);

export const DiscountDescriptionSchema = createRequiredStringSchema({
  requiredMessage: ResCode.DISCOUNT_DESCRIPTION_REQUIRED,
  invalidMessage: ResCode.DISCOUNT_DESCRIPTION_INVALID,
}).max(1000, {
  error: ResCode.DISCOUNT_DESCRIPTION_INVALID,
});

export const BaseDiscountSchema = z
  .object({
    name: DiscountNameSchema,

    description: DiscountDescriptionSchema,

    code: DiscountCodeSchema,

    startsAt: z.coerce.date(),

    endsAt: z.coerce.date(),

    usageLimit: z.number().int().positive(),

    usageLimitPerUser: z.number().int().positive(),

    minOrderValue: z.number().min(0).optional(),

    appliesTo: z
      .enum(Object.values(DISCOUNT_APPLIES_TO))
      .optional()
      .default(DISCOUNT_APPLIES_TO.ALL),

    applicableProducts: z.array(z.string().min(1)).optional(),

    applicableCategories: z
      .array(z.enum(Object.values(ProductType)))
      .optional(),
  })

  .refine(
    (data) => data.endsAt > data.startsAt,

    {
      message: ResCode.DISCOUNT_ENDS_AT_MUST_BE_AFTER_STARTS_AT,

      path: ["endsAt"],
    },
  )

  .superRefine((data, ctx) => {
    if (data.appliesTo === DISCOUNT_APPLIES_TO.PRODUCT) {
      if (!data.applicableProducts?.length) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,

          path: ["applicableProducts"],

          message: ResCode.DISCOUNT_APPLICABLE_PRODUCTS_REQUIRED,
        });
      }
    }

    if (data.appliesTo === DISCOUNT_APPLIES_TO.CATEGORY) {
      if (!data.applicableCategories?.length) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,

          path: ["applicableCategories"],

          message: ResCode.DISCOUNT_APPLICABLE_CATEGORIES_REQUIRED,
        });
      }
    }
  });

export const PercentageDiscountSchema = BaseDiscountSchema.extend({
  type: z.literal(DISCOUNT_TYPE.PERCENTAGE),
  config: z.object({
    percent: z.number().min(1).max(100),

    maxDiscountAmount: z.number().positive().optional(),
  }),
});

export const FixedAmountDiscountSchema = BaseDiscountSchema.extend({
  type: z.literal(DISCOUNT_TYPE.FIXED_AMOUNT),
  config: z.object({
    amount: z.number().positive(),
  }),
});

export const CreateShopDiscountRequestSchema = z.discriminatedUnion("type", [
  PercentageDiscountSchema,
  FixedAmountDiscountSchema,
]);

export type CreateShopDiscountRequest = z.infer<
  typeof CreateShopDiscountRequestSchema
>;

export const DiscountQuerySchema = z.object({
  code: DiscountCodeSchema,
});

export type DiscountQuery = z.infer<typeof DiscountQuerySchema>;

export const FindApplicableProductsByDiscountCodeRequestSchema =
  DiscountQuerySchema.extend(PaginationQuerySchema.shape);
export type FindApplicableProductsByDiscountCode = z.infer<
  typeof FindApplicableProductsByDiscountCodeRequestSchema
>;

export const FindShopDiscountByDiscountCodeRequestSchema = z.object({
  code: DiscountCodeSchema,
});
export type FindShopDiscountByDiscountCodeRequest = z.infer<
  typeof FindShopDiscountByDiscountCodeRequestSchema
>;
