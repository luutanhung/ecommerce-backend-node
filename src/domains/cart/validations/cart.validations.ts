import { z } from "zod";

export const CartItemSchema = z.object({
  productId: z.string().min(1, "Product ID is required"),
  shopId: z.string().min(1, "Shop ID is required"),
  quantity: z.number().int().positive("Quantity must be a positive integer"),
  name: z.string().optional(),
  price: z.number().positive("Price must be a positive number").optional(),
});
export type CartItem = z.infer<typeof CartItemSchema>;

export const AddProductToCartRequestBodySchema = CartItemSchema;

export type AddProductToCartRequestBody = z.infer<
  typeof AddProductToCartRequestBodySchema
>;
