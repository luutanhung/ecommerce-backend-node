import type {
  CreatePaymentForOrderResult,
  VerifyPaymentInput,
  VerifyPaymentResult,
  // RefundPaymentInput,
  // VerifyPaymentResultInput,
  createPaymentForOrderInput,
} from "./types/payment.provider.types.js";

export abstract class PaymentProvider {
  abstract createPaymentForOrder(
    input: createPaymentForOrderInput,
  ): Promise<CreatePaymentForOrderResult>;

  abstract verifyPayment(
    input: VerifyPaymentInput,
  ): Promise<VerifyPaymentResult>;

  // refund?(input: RefundPaymentInput): Promise<void>;
}
