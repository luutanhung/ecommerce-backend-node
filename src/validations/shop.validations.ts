import z from "zod";

import { ObjectIdSchema } from "./common.validations.js";

export const ShopParamsSchema = z.object({
  shopId: ObjectIdSchema,
});
export type ShopParams = z.infer<typeof ShopParamsSchema>;
