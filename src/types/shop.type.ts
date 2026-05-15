import { ShopRole, ShopStatus } from "../constants/shop.js";

export type ShopStatus = (typeof ShopStatus)[keyof typeof ShopStatus];
export type ShopRole = (typeof ShopRole)[keyof typeof ShopRole];
