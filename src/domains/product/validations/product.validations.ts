import z from "zod";

import { ProductType } from "../constants/product.constants.js";

import { ResCode } from "../../../shared/constants/resCode.constants.js";
import {
  SearchKeywordSchema,
  SortOrderSchema,
  createObjectIdSchema,
  createPositiveIntegerSchema,
  createPositiveNumberSchema,
  createRequiredStringSchema,
} from "../../../shared/validations/common.validations.js";
import { PaginationQuerySchema } from "../../../shared/validations/pagination.validations.js";

import { CategoryId } from "./productCategory.validations.js";

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

export const ProductThumbSchema = z.url({
  error: ResCode.PRODUCT_THUMB_INVALID,
});

export const ProductDescriptionSchema = z.string().trim().max(5000, {
  error: ResCode.PRODUCT_DESCRIPTION_EXCEEDED_CHARACTER_LIMIT,
});

export const ProductPriceSchema = createPositiveNumberSchema({
  invalidMessage: ResCode.PRODUCT_PRICE_INVALID,
  positiveMessage: ResCode.PRODUCT_PRICE_MUST_BE_POSITIVE,
});

export const ProductQuantitySchema = createPositiveIntegerSchema({
  invalidMessage: ResCode.PRODUCT_QUANTITY_INVALID,
  minValueMessage: ResCode.PRODUCT_QUANTITY_MUST_BE_NON_NEGATIVE,
  minValue: 0,
});

export const ProductAttributesSchema = z.record(z.string(), z.any());

export const ProductImagesSchema = z.array(
  z.url({
    error: ResCode.PRODUCT_IMAGE_INVALID,
  }),
);

export const BaseProductSchema = z.object({
  name: ProductNameSchema,

  thumb: ProductThumbSchema,

  description: ProductDescriptionSchema.optional(),

  price: ProductPriceSchema,

  quantity: ProductQuantitySchema,

  categoryId: CategoryId.optional(),

  /**
   * Dynamic attributes.
   */
  attributes: ProductAttributesSchema.default({}),

  /**
   * Product images gallery.
   */
  images: ProductImagesSchema.default([]),
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
