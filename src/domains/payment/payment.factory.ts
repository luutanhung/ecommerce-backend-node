
import type { PaymentProviderName } from "./types/payment.types.js";

import { BadRequestAppError } from "../../core/error/badRequestAppError.js";
import { ResCode } from "../../shared/constants/resCode.constants.js";

import type { PaymentProvider } from "./providers/payment.provider.js";
import { StripeProvider } from "./providers/stripe.provider.js";
import { VNPayProvider } from "./providers/vnpay.provider.js";

import { PAYMENT_PROVIDER } from "./payment.constants.js";

export class PaymentProviderFactory {
  static getProvider(provider: PaymentProviderName): PaymentProvider {
    switch (provider) {
      case PAYMENT_PROVIDER.STRIPE:
        return new StripeProvider();

      case PAYMENT_PROVIDER.VNPAY:
        return new VNPayProvider();

      default:
        throw new BadRequestAppError({
          code: ResCode.PAYMENT_PROVIDER_UNSUPPORTED,
        });
    }
  }
}
