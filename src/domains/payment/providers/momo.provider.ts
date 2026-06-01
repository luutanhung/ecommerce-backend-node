import { PaymentProvider } from "./payment.provider.js";

export class MomoProvider extends PaymentProvider {
  async createPayment(): Promise<string> {
    return "";
  }
}
