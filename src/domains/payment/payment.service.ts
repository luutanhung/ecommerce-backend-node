import type { ClientSession } from "mongoose";
import type Stripe from "stripe";

import type {
  CreatePaymentInput,
  HandleStripeWebhookInput,
} from "./types/payment.service.types.js";

import { config } from "../../configs/config.js";
import { NotFoundAppError } from "../../core/error/notFoundAppError.js";
import { CURRENCY } from "../../pricing/constants/currency.constants.js";
import { ResCode } from "../../shared/constants/resCode.constants.js";
import { withTransaction } from "../../shared/helpers/withTransaction.js";
import { toObjectId } from "../../shared/utils/mongoose.utils.js";
import { InventoryService } from "../inventory/inventory.service.js";
import { ORDER_STATUS } from "../order/order.constants.js";
import { Orders } from "../order/order.model.js";

import { StripeProvider } from "./providers/stripe/stripe.provider.js";

import { PAYMENT_STATUS } from "./payment.constants.js";
import { PaymentProviderFactory } from "./payment.factory.js";
import { Payments } from "./payment.model.js";

export class PaymentService {
  /**
   * Create a payment.
   */
  static async createPayment({ orderId, providerName }: CreatePaymentInput) {
    const order = await Orders.findOne({
      _id: toObjectId(orderId),
    }).lean();

    if (!order) {
      throw new NotFoundAppError({
        code: ResCode.ORDER_NOT_FOUND,
      });
    }

    const paymentProvider = PaymentProviderFactory.getProvider(providerName);

    const { paymentUrl, providerPaymentId } =
      await paymentProvider.createPayment({
        orderId: order._id.toString(),
        orderNumber: order.orderNumber,
        amount: order.summary.orderTotal,
        currency: CURRENCY.USD,
        description: order.description,
        successUrl: `${config.client.url}/payment/success`,
        cancelUrl: `${config.client.url}/payment/cancel`,
      });

    const payment = await Payments.create({
      order: order._id,
      provider: providerName,
      amount: order.summary.orderTotal,
      status: PAYMENT_STATUS.PENDING,
      providerPaymentId,
    });

    return {
      paymentId: payment._id,
      paymentUrl,
    };
  }

  static async handleStripeWebhook({
    body,
    signature,
  }: HandleStripeWebhookInput) {
    const provider = new StripeProvider();

    const event: Stripe.Event = provider.constructWebhookEvent({
      body,
      signature,
    });

    switch (event.type) {
      case "checkout.session.completed":
        break;

      case "checkout.session.expired":
        break;

      default:
        break;
    }
  }

  private static async handleCheckoutSessionCompleted(event: Stripe.Event) {
    const checkoutSession = event.data.object as Stripe.Checkout.Session;

    const orderId = checkoutSession.metadata?.orderId;

    if (!orderId) {
      return;
    }

    const order = await Orders.findById(orderId);

    if (!order) {
      return;
    }
    /**
     * Idempotency.
     * Stripe may send the same webhook multiple times.
     */
    if (order.paymentStatus === PAYMENT_STATUS.PAID) {
      return;
    }

    await withTransaction(async (session: ClientSession) => {
      const updatedOrder = await Orders.findById(orderId, null, { session });

      if (!updatedOrder) {
        throw new NotFoundAppError({
          code: ResCode.ORDER_NOT_FOUND,
        });
      }

      /**
       * Double-check inside transaction.
       */
      if (updatedOrder.paymentStatus === PAYMENT_STATUS.PAID) {
        return;
      }

      updatedOrder.paymentStatus = PAYMENT_STATUS.PAID;

      updatedOrder.status = ORDER_STATUS.CONFIRMED;

      await updatedOrder.save({
        session,
      });

      await InventoryService.commitReservation(
        {
          orderId,
        },
        {
          session,
        },
      );

      /**
       * Optional:
       * update payment record.
       */
      await Payments.updateOne(
        {
          providerPaymentId: checkoutSession.id,
        },
        {
          $set: {
            status: PAYMENT_STATUS.PAID,
            paidAt: new Date(),
          },
        },
        {
          session,
        },
      );
    });
  }
}
