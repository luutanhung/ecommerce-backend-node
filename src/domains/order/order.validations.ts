import { z } from "zod";

import { ResCode } from "../../shared/constants/resCode.constants.js";
import {
  UserAddressLineSchema,
  UserDistrictSchema,
  UserProvince,
  UserWardSchema,
} from "../access/validations/user.validations.js";
import { CartIdSchema } from "../cart/validations/cart.validations.js";
import {
  ProductIdSchema,
  ProductPriceSchema,
  ProductQuantitySchema,
} from "../product/validations/product.validations.js";
import { ShopIdSchema } from "../shop/validations/shop.validations.js";

export const OrderItemSchema = z.object({
  productId: ProductIdSchema,
  quantity: ProductQuantitySchema,
  price: ProductPriceSchema,
});

export const ShopOrderSchema = z.object({
  shopId: ShopIdSchema,
  discountCode: z.string(),
  items: z.array(OrderItemSchema).length(1, {
    error: ResCode.ORDER_ITEM_LIST_MUST_BE_NON_EMPTY,
  }),
});

export const OrderShippingAddressSchema = z.object({
  addressLine: UserAddressLineSchema,
  ward: UserWardSchema.optional(),
  district: UserDistrictSchema.optional(),
  province: UserProvince.optional(),
});

export const CheckoutOrderRequestBodySchema = z.object({
  cartId: CartIdSchema,
  shopOrders: z.array(ShopOrderSchema),
});
export type CheckoutOrderRequestBody = z.infer<
  typeof CheckoutOrderRequestBodySchema
>;

export const CreateOrderRequestBodySchema = z.object({
  cartId: CartIdSchema,
  shopOrders: z.array(ShopOrderSchema),
  shippingAddress: OrderShippingAddressSchema,
});
export type CreateOrderRequestBody = z.infer<
  typeof CreateOrderRequestBodySchema
>;
