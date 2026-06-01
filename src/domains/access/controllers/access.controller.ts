import type { Request, Response } from "express";

import { REFRESH_TOKEN_EXPIRES_IN_DAYS } from "../constants/access.constants.js";

import { AccessService } from "../services/access.service.js";

import type {
  AccessTokenPayload,
  RefreshTokenResult,
} from "../types/access.types.js";

import { env } from "../../../configs/env.js";
import { CreatedResponse } from "../../../core/response/created.response.js";
import { OKResponse } from "../../../core/response/ok.response.js";
import { ResCode } from "../../../shared/constants/resCode.constants.js";
import { UserMapper } from "../mappers/user.mapper.js";
import type {
  LoginBody,
  RegisterBody,
  VerifyEmailBody,
} from "../validations/access.validations.js";
import type { UserParams } from "../validations/user.validations.js";

class AccessController {
  // Unauthenticated.

  /**
   * Register a new shop.
   */
  async register(req: Request, res: Response): Promise<void> {
    const registerResult = await AccessService.register(
      req.body as RegisterBody,
    );

    new CreatedResponse({
      code: ResCode.USER_REGISTER_SUCCESS,
      data: {
        ...registerResult,
        user: UserMapper.toAuthenticatedUser(registerResult.user),
      },
    }).send(req, res);
  }

  /**
   * Send verification email.
   */
  async sendVerificationEmail(req: Request, res: Response): Promise<void> {
    const userId = (req.params as UserParams).userId;

    await AccessService.queueVerificationEmail({
      userId,
    });

    new OKResponse({
      code: ResCode.ACCESS_SEND_VERIFICATION_EMAIL_SUCCESS,
    }).send(req, res);
  }

  /**
   * Verify email.
   */
  async verifyEmail(req: Request, res: Response): Promise<void> {
    const token = (req.body as VerifyEmailBody).token;

    const verifiedUser = await AccessService.verifyEmail({
      emailVerificationToken: token,
    });

    new OKResponse({
      code: ResCode.ACCESS_VERIFY_EMAIL_SUCCEEDED,
      data: UserMapper.toAuthenticatedUser(verifiedUser),
    }).send(req, res);
  }

  /**
   * Logins with shop info.
   */
  async login(req: Request, res: Response): Promise<void> {
    const { user, tokens } = await AccessService.login(
      req?.validated?.body as LoginBody,
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
        user: UserMapper.toAuthenticatedUser(user),
        tokens: {
          accessToken: tokens.accessToken,
        },
      },
    }).send(req, res);
  }

  /**
   * Refreshes token.
   */
  async refreshToken(req: Request, res: Response): Promise<void> {
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
  }

  // Authenticated.

  /**
   * Logout from current device.
   */
  async logout(req: Request, res: Response): Promise<void> {
    await AccessService.logoutOneSession({
      sessionId: req.auth?.sid as string,
    });

    new OKResponse({
      code: ResCode.USER_LOGOUT_SUCCESS,
    }).send(req, res);
  }

  /**
   * Logout from all devices.
   */
  async logoutAll(req: Request, res: Response): Promise<void> {
    const { uid } = req.auth as AccessTokenPayload;
    await AccessService.logoutAll({
      userId: uid,
    });

    new OKResponse({
      code: ResCode.USER_LOGOUT_ALL_DEVICES_SUCCESS,
    }).send(req, res);
  }
}

export const accessController = new AccessController();
