import type { HydratedDocument, InferSchemaType, Types } from "mongoose";

import { SHOP_STATUS, ShopRole } from "../shop.constants.js";
import type { ShopSchema } from "../shop.model.js";

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
  shopOwner: string;
  shopName: string;
};
