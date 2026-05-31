import { z } from "zod";

import { ResCode } from "../../../shared/constants/resCode.constants.js";
import {
  createObjectIdSchema,
  createPositiveIntegerSchema,
} from "../../../shared/validations/common.validations.js";
import {
  ProductIdSchema,
  ProductNameSchema,
  ProductPriceSchema,
} from "../../product/validations/product.validations.js";
import { ShopIdSchema } from "../../shop/validations/shop.validations.js";

export const CartIdSchema = createObjectIdSchema({
  requiredMessage: ResCode.CART_ID_REQUIRED,
  invalidMessage: ResCode.CART_ID_INVALID,
});

export const CartItemQuantity = createPositiveIntegerSchema({
  invalidMessage: ResCode.CART_ITEM_QUANTITY_INVALID,
  minValue: 1,
  minValueMessage: ResCode.CART_ITEM_QUANTITY_MUST_BE_POSITIVE,
});

export const CartItemSchema = z.object({
  productId: ProductIdSchema,
  shopId: ShopIdSchema,
  quantity: CartItemQuantity,
  name: ProductNameSchema.optional(),
  price: ProductPriceSchema.optional(),
});
export type CartItem = z.infer<typeof CartItemSchema>;

export const AddProductToCartRequestBodySchema = CartItemSchema;

export type AddProductToCartRequestBody = z.infer<
  typeof AddProductToCartRequestBodySchema
>;

export const RemoveCartItemFromCartRequestBodySchema = z.object({
  productId: ProductIdSchema,
});
export type RemoveCartItemFromCartRequestBody = z.infer<
  typeof RemoveCartItemFromCartRequestBodySchema
>;
