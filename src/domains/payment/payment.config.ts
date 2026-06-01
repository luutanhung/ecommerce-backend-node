import { VNPay, ignoreLogger } from "vnpay";

import { config } from "../../configs/config.js";

export const vnpayClient = new VNPay({
  tmnCode: config.payment.vnpay.tmnCode,
  secureSecret: config.payment.vnpay.secret,

  testMode: config.payment.vnpay.testMode,

  enableLog: true,
  loggerFn: ignoreLogger,
});
