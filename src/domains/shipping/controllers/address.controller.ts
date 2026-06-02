import type { Request, Response } from "express";

import { AddressService } from "../services/address.service.js";

import { OKResponse } from "../../../core/response/ok.response.js";
import { ResCode } from "../../../shared/constants/resCode.constants.js";

class AddressController {
  /**
   * Get provinces from Vietnam's new provincial system.
   */
  async getProvinces(req: Request, res: Response) {
    new OKResponse({
      code: ResCode.ADDRESS_GET_PROVINCES_SUCCEEDED,
      data: await AddressService.getProvinces(),
    }).send(req, res);
  }
}

export const addressController = new AddressController();
