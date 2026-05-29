import z from "zod";

import { ObjectIdSchema } from "../../../shared/validations/common.validations.js";

export const ShopParamsSchema = z.object({
  shopId: ObjectIdSchema,
});
export type ShopParams = z.infer<typeof ShopParamsSchema>;

export const RegisterShopRequestSchema = z.object({
  name: z.string().min(1).max(150),
});
export type RegisterShopRequest = z.infer<typeof RegisterShopRequestSchema>;
