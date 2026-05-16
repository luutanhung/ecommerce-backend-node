import type { Request, RequestHandler, Response } from "express";

import { SuccessResponse } from "../core/response/success.response.js";

import {
  ResponseCode,
  ResponseMessage,
} from "../constants/response.constant.js";

import { AccessService } from "../services/access.service.js";

class AccessController {
  signUp: RequestHandler = async (req: Request, res: Response) => {
    const data = await AccessService.signUp(req.body);

    return new SuccessResponse({
      code: ResponseCode.SHOP_REGISTRATION_SUCCESS,
      message: ResponseMessage.SHOP_REGISTRATION_SUCCESS,
      data,
    }).send(res);
  };
}

export const accessController = new AccessController();
