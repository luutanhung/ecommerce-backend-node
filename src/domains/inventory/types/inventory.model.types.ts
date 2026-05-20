import type { HydratedDocument, InferSchemaType, Types } from "mongoose";

import { InventorySchema } from "../inventory.model.js";

export type Inventory = InferSchemaType<typeof InventorySchema>;
export type InventoryDocument = HydratedDocument<Inventory>;
export type InventoryLean = Inventory & {
  _id: Types.ObjectId;
};
