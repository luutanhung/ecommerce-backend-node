import type { HydratedDocument, InferSchemaType, Types } from "mongoose";

import { SHOP_STATUS, ShopRole } from "../constants/shop.constants.js";

import type { ShopSchema } from "../models/shop.model.js";

// Raw object shop.
export type Shop = InferSchemaType<typeof ShopSchema>;
// Mongoose document instance.
export type ShopDocument = HydratedDocument<Shop>;

export type ShopLean = Shop & {
  _id: Types.ObjectId;
};

export type ShopStatus = (typeof SHOP_STATUS)[keyof typeof SHOP_STATUS];
export type ShopRole = (typeof ShopRole)[keyof typeof ShopRole];

export type RegisterShopInput = {
  userId: string;
  name: string;
  slug?: string;
  description?: string;
};
