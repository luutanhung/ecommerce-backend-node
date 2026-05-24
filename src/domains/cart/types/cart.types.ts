import type { HydratedDocument, InferSchemaType, Types } from "mongoose";

import type { CartSchema } from "../models/cart.model.js";

export type Cart = InferSchemaType<typeof CartSchema>;
export type CartDocument = HydratedDocument<Cart>;
export type CartLean = Cart & {
  _id: Types.ObjectId;
};
