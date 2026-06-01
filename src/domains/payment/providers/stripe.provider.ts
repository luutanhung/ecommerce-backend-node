import { PaymentProvider } from "./payment.provider.js";

export class StripeProvider extends PaymentProvider {
  async createPayment(): Promise<string> {
    return "";
  }
}
