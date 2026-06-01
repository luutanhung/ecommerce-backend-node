import { z } from "zod";

import { ResCode } from "../../shared/constants/resCode.constants.js";
import { createObjectIdSchema } from "../../shared/validations/common.validations.js";
import { OrderIdSchema } from "../order/order.validations.js";

import { PAYMENT_PROVIDER } from "./payment.constants.js";

export const PaymentIdSchema = createObjectIdSchema({
  requiredMessage: ResCode.PAYMENT_ID_REQUIRED,
  invalidMessage: ResCode.PAYMENT_ID_INVALID,
});

export const PaymentProviderNameSchema = z.enum(
  Object.values(PAYMENT_PROVIDER),
);

export const CreatePaymentForOrderBodySchema = z.object({
  orderId: OrderIdSchema,
  providerName: PaymentProviderNameSchema,
});
export type CreatePaymentForOrderBody = z.infer<
  typeof CreatePaymentForOrderBodySchema
>;
