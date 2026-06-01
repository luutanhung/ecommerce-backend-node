import { z } from "zod";

import { ResCode } from "../../shared/constants/resCode.constants.js";
import {
  createObjectIdSchema,
  createPositiveIntegerSchema,
} from "../../shared/validations/common.validations.js";
import { ShopParamsSchema } from "../shop/validations/shop.validations.js";

export const InventoryIdSchema = createObjectIdSchema({
  requiredMessage: ResCode.INVENTORY_ID_REQUIRED,
  invalidMessage: ResCode.INVENTORY_ID_INVALID,
});

export const InventoryStockSchema = createPositiveIntegerSchema({
  invalidMessage: ResCode.INVENTORY_STOCK_INVALID,
  minValue: 1,
  minValueMessage: ResCode.INVENTORY_STOCK_MUST_BE_POSITIVE,
});

export const InventoryParamsSchema = z.object({
  inventoryId: InventoryIdSchema,
});
export type InventoryParams = z.infer<typeof InventoryParamsSchema>;

export const IncreaseStockParamsSchema = z.object({
  ...ShopParamsSchema.shape,
  ...InventoryParamsSchema.shape,
});
export const IncreaseStockBodySchema = z.object({
  stock: InventoryStockSchema,
});
export type IncreaseStockBody = z.infer<typeof IncreaseStockBodySchema>;

export const DecreaseStockParamsSchema = z.object({
  ...ShopParamsSchema.shape,
  ...InventoryParamsSchema.shape,
});

export const DecreaseStockBodySchema = z.object({
  stock: InventoryStockSchema,
});
export type DecreaseStockBody = z.infer<typeof DecreaseStockBodySchema>;
