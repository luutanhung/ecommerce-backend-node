import { Locale } from "../constants/locale.constants.js";

import type { ResponseCodeKey } from "../types/core/response.type.js";

import { AccessEnLocale } from "./locales/en/access.locale.js";
import { CartEnLocale } from "./locales/en/cart.locale.js";
import { CommonEnLocale } from "./locales/en/common.locale.js";
import { DiscountEnLocale } from "./locales/en/discount.locale.js";
import { InventoryEnLocale } from "./locales/en/inventory.locale.js";
import { ProductEnLocale } from "./locales/en/product.locale.js";
import { ShopEnLocale } from "./locales/en/shop.locale.js";
import { AccessViLocale } from "./locales/vi/access.locale.js";
import { CartViLocale } from "./locales/vi/cart.locale.js";
import { CommonViLocale } from "./locales/vi/common.locale.js";
import { DiscountViLocale } from "./locales/vi/discount.locale.js";
import { InventoryViLocale } from "./locales/vi/inventory.locale.js";
import { ProductViLocale } from "./locales/vi/product.locale.js";
import { ShopViLocale } from "./locales/vi/shop.locale.js";

export const ResMsg = {
  en: {
    ...CommonEnLocale,

    // Access.
    ...AccessEnLocale,

    // Shop.
    ...ShopEnLocale,

    // Product.
    ...ProductEnLocale,

    // Inventory.
    ...InventoryEnLocale,

    // Cart.
    ...CartEnLocale,

    // Pricing.
    ...DiscountEnLocale,
  },

  vi: {
    ...CommonViLocale,

    // Access.
    ...AccessViLocale,

    // Shop.
    ...ShopViLocale,

    // Product.
    ...ProductViLocale,

    // Inventory.
    ...InventoryViLocale,

    // Cart.
    ...CartViLocale,

    // Pricing.
    ...DiscountViLocale,
  },
} as const;

export function getResponseMessage(
  code: ResponseCodeKey,
  locale: keyof typeof ResMsg = Locale.VIETNAMESE,
): string {
  return ResMsg[locale]?.[code] ?? ResMsg.vi[code] ?? code;
}
