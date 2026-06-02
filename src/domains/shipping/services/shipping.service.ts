import { BadRequestAppError } from "../../../core/error/badRequestAppError.js";
import { ResCode } from "../../../shared/constants/resCode.constants.js";
import { SHIPPING_PROVIDER } from "../shipping.constants.js";
import type { ShippingProviderName } from "../shipping.types.js";

export class ShippingService {
  static getProvider(provider: ShippingProviderName) {
    switch (provider) {
      case SHIPPING_PROVIDER.GHN:
        return;

      default:
        throw new BadRequestAppError({
          code: ResCode.SHIPPING_PROVIDER_NOT_SUPPORTED,
        });
    }
  }

  static calculateShippingFee() {}
}
