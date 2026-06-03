import { BadRequestAppError } from "../../../core/error/badRequestAppError.js";
import { ResCode } from "../../../shared/constants/resCode.constants.js";
import { GHNProvider } from "../providers/ghn/ghn.provider.js";
import type {
  CalculateShippingFeeInput,
  CalculateShippingFeeResult,
} from "../providers/types/shipping.provider.types.js";
import { SHIPPING_PROVIDER } from "../shipping.constants.js";
import type { ShippingProviderName } from "../shipping.types.js";

export class ShippingService {
  static getProvider(provider: ShippingProviderName) {
    switch (provider) {
      case SHIPPING_PROVIDER.GHN:
        return new GHNProvider();

      default:
        throw new BadRequestAppError({
          code: ResCode.SHIPPING_PROVIDER_NOT_SUPPORTED,
        });
    }
  }

  static async calculateShippingFee(
    input: CalculateShippingFeeInput & {
      providerName: ShippingProviderName;
    },
  ): Promise<CalculateShippingFeeResult> {
    const { providerName, ...payload } = input;
    const shippingProvider = this.getProvider(providerName);

    return await shippingProvider.calculateShippingFee(payload);
  }
}
