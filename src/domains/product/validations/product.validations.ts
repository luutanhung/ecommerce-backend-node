import z from "zod";

import { ProductType } from "../constants/product.constants.js";

import { ResCode } from "../../../shared/constants/resCode.constants.js";
import {
  SearchKeywordSchema,
  SortOrderSchema,
  createObjectIdSchema,
  createPositiveNumberSchema,
  createRequiredStringSchema,
} from "../../../shared/validations/common.validations.js";
import { PaginationQuerySchema } from "../../../shared/validations/pagination.validations.js";

export const ProductIdSchema = createObjectIdSchema({
  requiredMessage: ResCode.PRODUCT_ID_REQUIRED,
  invalidMessage: ResCode.PRODUCT_ID_INVALID,
});

export const ProductNameSchema = createRequiredStringSchema({
  requiredMessage: ResCode.PRODUCT_NAME_REQUIRED,
  invalidMessage: ResCode.PRODUCT_NAME_INVALID,
})
  .min(1)
  .max(150);

export const BaseProductSchema = z.object({
  name: ProductNameSchema,

  thumb: z.url({
    error: ResCode.PRODUCT_THUMB_INVALID,
  }),

  description: z.string().trim().max(5000).optional(),

  price: createPositiveNumberSchema({
    invalidMessage: ResCode.PRODUCT_PRICE_INVALID,
    positiveMessage: ResCode.PRODUCT_PRICE_MUST_BE_POSITIVE,
  }),

  quantity: z
    .number({
      error: ResCode.PRODUCT_QUANTITY_INVALID_TYPE,
    })
    .int()
    .min(0, {
      error: ResCode.PRODUCT_QUANTITY_MUST_BE_POSITIVE,
    }),

  categoryId: z.string().min(1).optional(),

  /**
   * Dynamic attributes.
   */
  attributes: z.record(z.string(), z.any()).default({}),

  /**
   * Product images gallery.
   */
  images: z.array(z.string().url()).default([]),
});

export const CreateProductRequestSchema = BaseProductSchema;

export type CreateProductRequest = z.infer<typeof CreateProductRequestSchema>;

export const ProductParamsSchema = z.object({
  productId: ProductIdSchema,
});
export type ProductParams = z.infer<typeof ProductParamsSchema>;

export const SearchPublishedProductRequestSchema =
  PaginationQuerySchema.merge(SearchKeywordSchema);

export type SearchPublishedProductRequest = z.infer<
  typeof SearchPublishedProductRequestSchema
>;

export const PublicProductFilterSchema = z.object({
  productType: z.enum(Object.values(ProductType)).optional(),
});

export const SellerProductFilterSchema = z
  .object({
    isPublished: z.boolean().optional(),
  })
  .extend(PublicProductFilterSchema.shape);

export const ProductSortSchema = z
  .object({
    sortBy: z
      .enum(["ctime", "productName", "productPrice", "productAverageRating"])
      .default("ctime"),
  })
  .extend(SortOrderSchema.shape);

export const FindPublishedProductsSchema = z.object({
  ...PaginationQuerySchema.shape,
  ...SearchKeywordSchema.shape,
  ...ProductSortSchema.shape,
  ...PublicProductFilterSchema.shape,
});
export type FindPublishedProducts = z.infer<typeof FindPublishedProductsSchema>;
