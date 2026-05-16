import type { InferSchemaType } from "mongoose";

import { ShopRole, ShopStatus } from "../constants/shop.constant.js";

import type { shopSchema } from "../models/shop.model.js";

export type ShopStatus = (typeof ShopStatus)[keyof typeof ShopStatus];
export type ShopRole = (typeof ShopRole)[keyof typeof ShopRole];

export type ShopDocument = InferSchemaType<typeof shopSchema>;
