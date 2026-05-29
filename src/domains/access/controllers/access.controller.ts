import type { Request, Response } from "express";

import { REFRESH_TOKEN_EXPIRES_IN_DAYS } from "../constants/access.constants.js";

import { AccessService } from "../services/access.service.js";

import type {
  AccessTokenPayload,
  RefreshTokenResult,
} from "../types/access.type.js";

import { env } from "../../../configs/env.js";
import { CreatedResponse } from "../../../core/response/created.response.js";
import { OKResponse } from "../../../core/response/ok.response.js";
import { ResCode } from "../../../shared/constants/resCode.constants.js";
import { sanitizeUser } from "../../../shared/utils/sanitizer.utils.js";
import type {
  LoginRequest,
  RegisterRequest,
} from "../validations/access.validations.js";

class AccessController {
  /**
   * Register a new shop.
   */
  async register(req: Request, res: Response): Promise<void> {
    const registerResult = await AccessService.register(
      req.body as RegisterRequest,
    );

    new CreatedResponse({
      code: ResCode.USER_REGISTER_SUCCESS,
      data: registerResult,
    }).send(req, res);
  }

  /**
   * Logins with shop info.
   */
  async login(req: Request, res: Response): Promise<void> {
    const { user, tokens } = await AccessService.login(
      req?.validated?.body as LoginRequest,
    );

    /**
     * Store refresh token in secure httpOnly cookie.
     */
    res.cookie("refreshToken", tokens.refreshToken, {
      httpOnly: true,
      secure: env.isProd,
      sameSite: "none",
      maxAge: REFRESH_TOKEN_EXPIRES_IN_DAYS * 24 * 60 * 60 * 1000,
    });

    new OKResponse({
      code: ResCode.USER_LOGIN_SUCCESS,
      data: {
        user: sanitizeUser(user),
        accessToken: tokens.accessToken,
      },
    }).send(req, res);
  }

  /**
   * Refreshes token.
   */
  refreshToken = async (req: Request, res: Response): Promise<void> => {
    const { accessToken, refreshToken }: RefreshTokenResult =
      await AccessService.refreshToken({
        refreshToken: req.cookies.refreshToken,
      });

    /**
     * Store refresh token in secure httpOnly cookie.
     */
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: env.isProd,
      sameSite: "none",
      maxAge: REFRESH_TOKEN_EXPIRES_IN_DAYS * 24 * 60 * 60 * 1000,
    });

    new OKResponse({
      code: ResCode.REFRESH_TOKEN_SUCCESS,
      data: {
        accessToken,
      },
    }).send(req, res);
  };

  /**
   * Logout from current device.
   */
  async logout(req: Request, res: Response): Promise<void> {
    await AccessService.logoutOneSession({
      sessionId: req.user?.sid as string,
    });

    new OKResponse({
      code: ResCode.USER_LOGOUT_SUCCESS,
    }).send(req, res);
  }

  /**
   * Logout from all devices.
   */
  async logoutAll(req: Request, res: Response): Promise<void> {
    const { uid } = req.user as AccessTokenPayload;
    await AccessService.logoutAllSessions({
      userId: uid,
    });

    new OKResponse({
      code: ResCode.USER_LOGOUT_ALL_DEVICES_SUCCESS,
    }).send(req, res);
  }
}

export const accessController = new AccessController();
