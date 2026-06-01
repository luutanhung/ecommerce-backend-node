import { PaymentProvider } from "./payment.provider.js";

export class VNPayProvider extends PaymentProvider {
  async createPaymentUrl(): Promise<string> {
    return "";
  }

  // async verifyCallback(payload: Record<string, unknown>) {
  //   // validate secure hash
  // }
}
