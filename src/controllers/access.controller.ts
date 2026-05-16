import type { Request, RequestHandler, Response } from "express";

import { HttpStatusCode } from "../constants/http.constant.js";
import {
  ResponseCode,
  ResponseMessage,
} from "../constants/response.constant.js";

import { AccessService } from "../services/access.service.js";

import type { ApiResponse } from "../types/response.type.js";

class AccessController {
  signUp: RequestHandler = async (req: Request, res: Response) => {
    const data = await AccessService.signUp(req.body);

    const apiRes: ApiResponse = {
      code: ResponseCode.SHOP_REGISTRATION_SUCCESS,
      message: ResponseMessage.SHOP_REGISTRATION_SUCCESS,
      data,
    };

    return res.status(HttpStatusCode.CREATED).json(apiRes);
  };
}

export const accessController = new AccessController();
