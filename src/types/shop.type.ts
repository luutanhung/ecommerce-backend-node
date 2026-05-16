import { ShopRole, ShopStatus } from "../constants/shop.constant.js";

export type ShopStatus = (typeof ShopStatus)[keyof typeof ShopStatus];
export type ShopRole = (typeof ShopRole)[keyof typeof ShopRole];
