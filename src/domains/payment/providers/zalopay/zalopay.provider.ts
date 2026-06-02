import type {
  CreatePaymentForOrderResult,
  VerifyPaymentInput,
  VerifyPaymentResult,
  createPaymentForOrderInput,
} from "../types/payment.provider.types.js";

import { PaymentProvider } from "../payment.provider.js";

export class ZaloPayProvider extends PaymentProvider {
  override async createPaymentForOrder(
    // eslint-disable-next-line
    input: createPaymentForOrderInput,
  ): Promise<CreatePaymentForOrderResult> {
    return {
      providerPaymentId: "xxx",
      paymentUrl: "xxx",
    };
  }

  override async verifyPayment(
    // eslint-disable-next-line
    input: VerifyPaymentInput,
  ): Promise<VerifyPaymentResult> {
    return {
      success: true,
      providerPaymentId: "xxx",
    };
  }
}
