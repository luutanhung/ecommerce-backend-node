import Stripe from "stripe";

import type {
  ConstructWebhookEventInput,
  CreatePaymentForOrderResult,
  VerifyPaymentInput,
  createPaymentForOrderInput,
} from "../types/payment.provider.types.js";

import { config } from "../../../../configs/config.js";
import { BadRequestAppError } from "../../../../core/error/badRequestAppError.js";
import { InternalSystemError } from "../../../../core/error/internalSystemError.js";
import { ResCode } from "../../../../shared/constants/resCode.constants.js";
import { PAYMENT_METHOD } from "../../payment.constants.js";
import type { PaymentMethod } from "../../types/payment.types.js";
import { PaymentProvider } from "../payment.provider.js";

import { stripeClient } from "./stripe.client.js";
import { toStripeAmount } from "./stripe.helpers.js";

export class StripeProvider extends PaymentProvider {
  private getPaymentMethodTypes(
    method: PaymentMethod,
  ): Stripe.Checkout.SessionCreateParams.PaymentMethodType[] {
    switch (method) {
      case PAYMENT_METHOD.CARD:
        return ["card"];

      case PAYMENT_METHOD.BANK_TRANSFER:
        return ["customer_balance"];

      default:
        throw new BadRequestAppError({
          code: ResCode.PAYMENT_METHOD_NOT_SUPPORTED,
        });
    }
  }

  async createPaymentForOrder(
    input: createPaymentForOrderInput,
  ): Promise<CreatePaymentForOrderResult> {
    const {
      orderId,
      orderNumber,
      amount,
      currency,
      successUrl,
      cancelUrl,
      method,
    } = input;

    const paymentMethodTypes = this.getPaymentMethodTypes(method);

    const session = await stripeClient.checkout.sessions.create({
      mode: "payment",
      payment_method_types: paymentMethodTypes,
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
