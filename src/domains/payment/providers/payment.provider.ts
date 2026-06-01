import type {
  CreatePaymentInput,
  // RefundPaymentInput,
  // VerifyPaymentResultInput,
} from "./types/payment.provider.types.js";

export abstract class PaymentProvider {
  abstract createPayment(input: CreatePaymentInput): Promise<string>;

  // abstract verifyCallback(
  //   payload: Record<string, unknown>,
  // ): Promise<VerifyPaymentResultInput>;

  // refund?(input: RefundPaymentInput): Promise<void>;
}
