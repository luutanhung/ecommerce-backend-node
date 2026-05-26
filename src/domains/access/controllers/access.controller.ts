import type { Request, Response } from "express";

import { AccessService } from "../services/access.service.js";

import type { RefreshTokenResult } from "../types/access.type.js";
import type { KeyTokenLean } from "../types/keytoken.type.js";

import { ResCode } from "../../../constants/resCode.constants.js";
import { CreatedResponse } from "../../../core/response/created.response.js";
import { OKResponse } from "../../../core/response/ok.response.js";
import type { BodyRequest } from "../../../shared/types/http.type.js";
import type {
  LoginRequest,
  RefreshTokenRequest,
  RegisterRequest,
} from "../validations/access.validations.js";

class AccessController {
  /**
   * Register a new shop.
   */
  register = async (
    req: BodyRequest<RegisterRequest>,
    res: Response,
  ): Promise<void> => {
    const registerResult = await AccessService.register(req.body);

    new CreatedResponse({
      code: ResCode.USER_REGISTER_SUCCESS,
      data: registerResult,
    }).send(req, res);
  };

  /**
   * Logins with shop info.
   */
  login = async (
    req: BodyRequest<LoginRequest>,
    res: Response,
  ): Promise<void> => {
    const loginResult = await AccessService.login(req.body);

    new OKResponse({
      code: ResCode.USER_LOGIN_SUCCESS,
      data: loginResult,
    }).send(req, res);
  };

  /**
   * Refreshes token.
   */
  refreshToken = async (
    req: BodyRequest<RefreshTokenRequest>,
    res: Response,
  ): Promise<void> => {
    const refreshTokenResult: RefreshTokenResult =
      await AccessService.refreshToken({
        refreshToken: req.body.refreshToken,
      });

    new OKResponse({
      code: ResCode.REFRESH_TOKEN_SUCCESS,
      data: refreshTokenResult,
    }).send(req, res);
  };

  /**
   * Logout.
   */
  logout = async (req: Request, res: Response): Promise<void> => {
    await AccessService.logout({
      keyToken: req.keyToken as KeyTokenLean,
    });

    new OKResponse({
      code: ResCode.USER_LOGOUT_SUCCESS,
    }).send(req, res);
  };
}

export const accessController = new AccessController();
