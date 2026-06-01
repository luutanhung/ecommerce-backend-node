import Stripe from "stripe";

import type {
  ConstructWebhookEventInput,
  CreatePaymentInput,
  CreatePaymentResult,
  VerifyPaymentInput,
} from "../types/payment.provider.types.js";

import { config } from "../../../../configs/config.js";
import { InternalSystemError } from "../../../../core/error/internalSystemError.js";
import { ResCode } from "../../../../shared/constants/resCode.constants.js";
import { PaymentProvider } from "../payment.provider.js";

import { stripeClient } from "./stripe.client.js";
import { toStripeAmount } from "./stripe.helpers.js";

export class StripeProvider extends PaymentProvider {
  async createPayment(input: CreatePaymentInput): Promise<CreatePaymentResult> {
    const { orderId, orderNumber, amount, currency, successUrl, cancelUrl } =
      input;

    const session = await stripeClient.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: currency.toLocaleLowerCase(),
            unit_amount: toStripeAmount(amount, currency),
            product_data: {
              name: `Order ${orderNumber}`,
            },
          },
        },
      ],
      metadata: {
        orderId,
        orderNumber,
      },
      success_url: successUrl,
      cancel_url: cancelUrl,
    });

    if (!session.url) {
      throw new InternalSystemError({
        code: ResCode.PAYMENT_STRIPE_CREATE_SESSION_FAILED,
      });
    }

    return {
      providerPaymentId: session.id,
      paymentUrl: session.url,
    };
  }

  constructWebhookEvent({
    body,
    signature,
  }: ConstructWebhookEventInput): Stripe.Event {
    const event = stripeClient.webhooks.constructEvent(
      body,
      signature,
      config.payment.stripe.webhookSecret,
    );

    return event;
  }

  async verifyPayment(input: VerifyPaymentInput) {
    const { body, signature } = input;

    const event = this.constructWebhookEvent({
      body,
      signature,
    });

    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;

        return {
          success: true,
          providerPaymentId: session.id,
          raw: session,
        };
      }

      default: {
        return {
          success: false,
          providerPaymentId: "",
          raw: event,
        };
      }
    }
  }
}
