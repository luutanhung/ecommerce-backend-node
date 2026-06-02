import { BadRequestAppError } from "../../../../core/error/badRequestAppError.js";
import { ResCode } from "../../../../shared/constants/resCode.constants.js";
import type { Currency } from "../../../pricing/types/currency.types.js";

export function toStripeAmount(amount: number, currency: Currency): number {
  switch (currency.toUpperCase()) {
    case "USD":
      return Math.round(amount * 100);

    case "VND":
      return Math.round(amount);

    default:
      throw new BadRequestAppError({
        code: ResCode.SHOP_CURRENCY_NOT_SUPPORTED,
      });
  }
}
