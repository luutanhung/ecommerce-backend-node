import type {
  CreatePaymentInput,
  CreatePaymentResult,
  VerifyPaymentInput,
  VerifyPaymentResult,
  // RefundPaymentInput,
  // VerifyPaymentResultInput,
} from "./types/payment.provider.types.js";

export abstract class PaymentProvider {
  abstract createPayment(
    input: CreatePaymentInput,
  ): Promise<CreatePaymentResult>;

  abstract verifyPayment(
    input: VerifyPaymentInput,
  ): Promise<VerifyPaymentResult>;

  // refund?(input: RefundPaymentInput): Promise<void>;
}
