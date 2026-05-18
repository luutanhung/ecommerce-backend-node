import type { Request, RequestHandler, Response } from "express";

import { CreatedResponse } from "../core/response/created.response.js";
import { OKResponse } from "../core/response/ok.response.js";

import { ResCode } from "../constants/response.constants.js";

import { AccessService } from "../services/access.service.js";

import type {
  LoginResult,
  RefreshTokenResult,
  RegisterResult,
} from "../types/access.type.js";
import type { KeyTokenLean } from "../types/keytoken.type.js";

class AccessController {
  /**
   * Register a new shop.
   */
  register: RequestHandler = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    const registerResult: RegisterResult = await AccessService.register(
      req.body,
    );

    new CreatedResponse({
      code: ResCode.SHOP_REGISTRATION_SUCCESS,
      data: registerResult,
    }).send(res);
  };

  /**
   * Logins with shop info.
   */
  login: RequestHandler = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    const loginResult: LoginResult = await AccessService.login(req.body);

    new OKResponse({
      code: ResCode.SHOP_LOGIN_SUCCESS,
      data: loginResult,
    }).send(res);
  };

  /**
   * Refreshes token.
   */
  refreshToken: RequestHandler = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    const refreshTokenResult: RefreshTokenResult =
      await AccessService.refreshToken({
        refreshToken: req.body.refreshToken,
      });

    new OKResponse({
      code: ResCode.REFRESH_TOKEN_SUCCESS,
      data: refreshTokenResult,
    }).send(res);
  };

  /**
   * Logout.
   */
  logout: RequestHandler = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    await AccessService.logout({
      keyToken: req.keyToken as KeyTokenLean,
    });

    new OKResponse({
      code: ResCode.SHOP_LOGOUT_SUCCESS,
    }).send(res);
  };
}

export const accessController = new AccessController();
