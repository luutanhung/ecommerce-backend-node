import { PaymentProvider } from "./payment.provider.js";

export class VNPayProvider extends PaymentProvider {
  async createPayment(): Promise<string> {
    return "";
  }

  // async verifyCallback(payload: Record<string, unknown>) {
  //   // validate secure hash
  // }
}
