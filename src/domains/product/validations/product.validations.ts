import _ from "lodash";
import z from "zod";

import { ProductType } from "../constants/product.constants.js";

import { ResCode } from "../../../constants/resCode.constants.js";
import {
  ObjectIdSchema,
  PositiveNumberSchema,
} from "../../../shared/validations/common.validations.js";

const BaseProductSchema = z.object({
  productName: z
    .string({
      error: (issue) => {
        const productName = issue.input;

        if (_.isUndefined(productName)) {
          return ResCode.PRODUCT_NAME_REQUIRED;
        }

        if (!_.isString(productName)) {
          return ResCode.PRODUCT_NAME_INVALID_TYPE;
        }
      },
    })
    .min(1),

  productThumb: z
    .string({
      error: (issue) => {
        const productThumb = issue.input;

        if (_.isUndefined(productThumb)) {
          return ResCode.PRODUCT_THUMB_REQUIRED;
        }

        if (!_.isString(productThumb)) {
          return ResCode.PRODUCT_THUMB_INVALID_TYPE;
        }
      },
    })
    .min(1),

  productDescription: z.string().optional(),

  productPrice: PositiveNumberSchema(
    ResCode.PRODUCT_PRICE_INVALID_TYPE,
    ResCode.PRODUCT_PRICE_MUST_BE_POSITIVE,
  ),

  productQuantity: PositiveNumberSchema(
    ResCode.PRODUCT_QUANTITY_INVALID_TYPE,
    ResCode.PRODUCT_QUANTITY_MUST_BE_POSITIVE,
  ).int({
    error: ResCode.PRODUCT_QUANTITY_INVALID_TYPE,
  }),
});

const ClothingProductSchema = BaseProductSchema.extend({
  productType: z.literal(ProductType.CLOTHING),

  productAttributes: z.object({
    brand: z.string().min(1),

    size: z.string().optional(),

    material: z.string().optional(),
  }),
});

const ElectronicProductSchema = BaseProductSchema.extend({
  productType: z.literal(ProductType.ELECTRONICS),

  productAttributes: z.object({
    manufacturer: z.string().min(1),

    model: z.string().optional(),

    color: z.string().optional(),
  }),
});

export const FurnitureProductSchema = BaseProductSchema.extend({
  productType: z.literal(ProductType.FURNITURE),

  productAttributes: z.object({
    brand: z.string().min(1),

    size: z.string().optional(),

    material: z.string().optional(),
  }),
});

export const CreateProductRequestSchema = z.discriminatedUnion("productType", [
  ClothingProductSchema,
  ElectronicProductSchema,
  FurnitureProductSchema,
]);
export type CreateProductRequest = z.infer<typeof CreateProductRequestSchema>;

export const ProductParamsSchema = z.object({
  productId: ObjectIdSchema,
});
export type ProductParams = z.infer<typeof ProductParamsSchema>;
