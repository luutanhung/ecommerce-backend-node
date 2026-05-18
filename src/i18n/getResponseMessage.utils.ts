import type { ResponseCodeKey } from "../types/core/response.type.js";

import { AccessEnLocale } from "./locales/en/access.locale.js";
import { CommonEnLocale } from "./locales/en/common.locale.js";
import { ProductEnLocale } from "./locales/en/product.locale.js";
import { ShopEnLocale } from "./locales/en/shop.locale.js";
import { AccessViLocale } from "./locales/vi/access.locale.js";
import { CommonViLocale } from "./locales/vi/common.locale.js";
import { ProductViLocale } from "./locales/vi/product.locale.js";
import { ShopViLocale } from "./locales/vi/shop.locale.js";

export const ResMsg = {
  en: {
    ...CommonEnLocale,
    ...AccessEnLocale,
    ...ShopEnLocale,
    ...ProductEnLocale,
  },

  vi: {
    ...CommonViLocale,
    ...AccessViLocale,
    ...ShopViLocale,
    ...ProductViLocale,
  },
} as const;

export function getResponseMessage(
  code: ResponseCodeKey,
  locale: keyof typeof ResMsg = "vi",
): string {
  return ResMsg[locale]?.[code] ?? ResMsg.vi[code] ?? code;
}
