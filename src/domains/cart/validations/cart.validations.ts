import { z } from "zod";

import { ProductIdSchema } from "../../product/validations/product.validations.js";
import { ShopIdSchema } from "../../shop/validations/shop.validations.js";

export const CartItemSchema = z.object({
  productId: ProductIdSchema,
  shopId: ShopIdSchema,
  quantity: z.number().int().positive("Quantity must be a positive integer"),
  name: z.string().optional(),
  price: z.number().positive("Price must be a positive number").optional(),
});
export type CartItem = z.infer<typeof CartItemSchema>;

export const AddProductToCartRequestBodySchema = CartItemSchema;

export type AddProductToCartRequestBody = z.infer<
  typeof AddProductToCartRequestBodySchema
>;

export const RemoveProductFromCartRequestBodySchema = z.object({
  productId: z.string().min(1),
});
export type RemoveProductFromCartRequestBody = z.infer<
  typeof RemoveProductFromCartRequestBodySchema
>;
