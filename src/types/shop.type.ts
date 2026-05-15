import { ShopStatus } from "../constants/shop.js";

export type ShopStatus = (typeof ShopStatus)[keyof typeof ShopStatus];
