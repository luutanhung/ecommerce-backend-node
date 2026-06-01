import type { CreatePaymentInput } from "./types/payment.service.types.js";

import { NotFoundAppError } from "../../core/error/notFoundAppError.js";
import { CURRENCY } from "../../pricing/constants/currency.constants.js";
import { ResCode } from "../../shared/constants/resCode.constants.js";
import { toObjectId } from "../../shared/utils/mongoose.utils.js";
import { Orders } from "../order/order.model.js";

import { PAYMENT_STATUS } from "./payment.constants.js";
import { PaymentProviderFactory } from "./payment.factory.js";
import { Payments } from "./payment.model.js";

export class PaymentService {
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

    const paymentUrl = await paymentProvider.createPayment({
      orderId: order._id.toString(),
      orderNumber: order.orderNumber,
      amount: order.summary.orderTotal,
      currency: CURRENCY.USD,
      description: order.description,
    });

    const payment = await Payments.create({
      order: order._id,
      provider: providerName,
      amount: order.summary.orderTotal,
      status: PAYMENT_STATUS.PENDING,
    });

    return {
      paymentId: payment._id,
      paymentUrl,
    };
  }
}
