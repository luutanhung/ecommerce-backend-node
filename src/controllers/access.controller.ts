import type { Request, RequestHandler, Response } from "express";

import { CreatedResponse } from "../core/response/created.response.js";
import { OKResponse } from "../core/response/ok.response.js";

import { ResponseCode } from "../constants/response.constant.js";

import { AccessService } from "../services/access.service.js";

import type { LoginResult, RegisterResult } from "../types/access.type.js";

class AccessController {
  register: RequestHandler = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    const registerResult: RegisterResult = await AccessService.register(
      req.body,
    );

    new CreatedResponse({
      code: ResponseCode.SHOP_REGISTRATION_SUCCESS,
      data: registerResult,
    }).send(res);
  };

  login: RequestHandler = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    const loginResult: LoginResult = await AccessService.login(req.body);

    new OKResponse({
      code: ResponseCode.SHOP_LOGIN_SUCCESS,
      data: loginResult,
    }).send(res);
  };
}

export const accessController = new AccessController();
