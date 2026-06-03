import type { Request, Response } from "express";

import { ShippingService } from "../services/shipping.service.js";

import { OKResponse } from "../../../core/response/ok.response.js";
import { ResCode } from "../../../shared/constants/resCode.constants.js";
import type { CalculateShippingFeeBody } from "../validations/shipping.validations.js";

export class ShippingController {
  async calculateShippingFee(req: Request, res: Response) {
    new OKResponse({
      code: ResCode.SHIPPING_CALCULATE_SHIPPING_FEE_SUCCEEDED,
      data: await ShippingService.calculateShippingFee(
        req.validated?.body as CalculateShippingFeeBody,
      ),
    }).send(req, res);
  }
}
