import type { HydratedDocument, InferSchemaType, Types } from "mongoose";

import { ShopRole, ShopStatus } from "../shop.constants.js";
import type { ShopSchema } from "../shop.model.js";

// Raw object shop.
export type Shop = InferSchemaType<typeof ShopSchema>;
// Mongoose document instance.
export type ShopDocument = HydratedDocument<Shop>;

export type ShopLean = Shop & {
  _id: Types.ObjectId;
};

export type ShopStatus = (typeof ShopStatus)[keyof typeof ShopStatus];
export type ShopRole = (typeof ShopRole)[keyof typeof ShopRole];

export type RegisterShopInput = {
  shopOwner: string;
  shopName: string;
};
