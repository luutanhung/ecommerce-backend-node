import type {
  CreatePaymentUrlInput,
  // RefundPaymentInput,
  // VerifyPaymentResultInput,
} from "./types/payment.provider.types.js";

export abstract class PaymentProvider {
  abstract createPaymentUrl(input: CreatePaymentUrlInput): Promise<string>;

  // abstract verifyCallback(
  //   payload: Record<string, unknown>,
  // ): Promise<VerifyPaymentResultInput>;

  // refund?(input: RefundPaymentInput): Promise<void>;
}
