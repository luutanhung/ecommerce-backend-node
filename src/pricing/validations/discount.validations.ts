import { z } from "zod";

import {
  DISCOUNT_APPLIES_TO,
  DISCOUNT_TYPE,
} from "../constants/discount.constants.js";

import { ProductType } from "../../domains/product/constants/product.constants.js";

export const CreateShopDiscountRequestSchema = z
  .object({
    name: z.string().min(1).max(150),

    description: z.string().max(1000),

    type: z.enum(Object.values(DISCOUNT_TYPE)),

    value: z.number().positive(),

    code: z
      .string()
      .trim()
      .min(3)
      .max(50)
      .transform((v) => v.toUpperCase()),

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
      message: "endsAt must be after startsAt",

      path: ["endsAt"],
    },
  )

  .superRefine((data, ctx) => {
    if (data.appliesTo === DISCOUNT_APPLIES_TO.PRODUCTS) {
      if (!data.applicableProducts?.length) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,

          path: ["applicableProducts"],

          message: "applicableProducts is required",
        });
      }
    }

    if (data.appliesTo === DISCOUNT_APPLIES_TO.CATEGORIES) {
      if (!data.applicableCategories?.length) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,

          path: ["applicableCategories"],

          message: "applicableCategories is required",
        });
      }
    }
  });

export type CreateShopDiscountRequest = z.infer<
  typeof CreateShopDiscountRequestSchema
>;
