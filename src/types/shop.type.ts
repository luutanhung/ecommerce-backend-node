import type { HydratedDocument, InferSchemaType, Types } from "mongoose";

import { ShopRole, ShopStatus } from "../constants/shop.constant.js";

import type { shopSchema } from "../models/shop.model.js";

// Raw object shop.
export type Shop = InferSchemaType<typeof shopSchema>;
// Mongoose document instance.
export type ShopDocument = HydratedDocument<Shop>;

export type ShopLean = Shop & {
  _id: Types.ObjectId;
};

export type ShopStatus = (typeof ShopStatus)[keyof typeof ShopStatus];
export type ShopRole = (typeof ShopRole)[keyof typeof ShopRole];
