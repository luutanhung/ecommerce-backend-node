import { z } from "zod";

import { CartIdSchema } from "../cart/validations/cart.validations.js";
import {
  ProductIdSchema,
  ProductQuantitySchema,
} from "../product/validations/product.validations.js";
import { ShopIdSchema } from "../shop/validations/shop.validations.js";

export const OrderItemSchema = z.object({
  productId: ProductIdSchema,
  quantity: ProductQuantitySchema,
});

export const ShopOrderSchema = z.object({
  shopId: ShopIdSchema,
  discountCodes: z.array(z.string()),
  items: z.array(OrderItemSchema),
});

export const CheckoutOrderRequestBodySchema = z.object({
  cartId: CartIdSchema,
  shopOrders: z.array(ShopOrderSchema),
});
export type CheckoutOrderRequestBody = z.infer<
  typeof CheckoutOrderRequestBodySchema
>;
