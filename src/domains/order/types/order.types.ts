import type { HydratedDocument, InferSchemaType, Types } from "mongoose";

import { OrderSchema } from "../order.model.js";

export type Order = InferSchemaType<typeof OrderSchema>;
export type OrderDocument = HydratedDocument<Order>;
export type OrderLean = Order & {
  _id: Types.ObjectId;
};
