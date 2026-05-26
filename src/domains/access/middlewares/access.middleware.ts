import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import { Sessions } from "../models/session.model.js";
import { Users } from "../models/user.model.js";

import { findActiveApiKey } from "../services/apikey.service.js";

import type { AccessTokenPayload } from "../types/access.type.js";
import type { ApiKeyPermission } from "../types/apikey.type.js";

import { RequestHeaders } from "../../../constants/http.constants.js";
import { ResCode } from "../../../constants/resCode.constants.js";
import { AppError } from "../../../core/error/appError.js";
import { AuthenticationFailedAppError } from "../../../core/error/authenticationFailedAppError.js";
import { NotFoundAppError } from "../../../core/error/notFoundAppError.js";
import { UnauthorizedAppError } from "../../../core/error/unauthorizedAppError.js";
import { asyncWrapper } from "../../../shared/helpers/asyncWrapper.js";
import { composeMiddlewares } from "../../../shared/helpers/composeMiddlewares.js";
import { toObjectId } from "../../../shared/utils/mongoose.utils.js";

/**
 * Check if there is an active api key document stored. If there are any, attach it to req object and move on.
 */
export const authenticateApiKey = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const apiKey = req.headers[RequestHeaders.API_KEY]?.toString();
    if (!apiKey) {
      return res.status(403).json({
        message: "Forbidden Error",
      });
    }

    // Check whether apiKey exists in ApiKeys collections.
    const apiKeyObj = await findActiveApiKey(apiKey);
    if (!apiKeyObj) {
      return res.status(403).json({
        message: "Forbidden Error",
      });
    }

    req.apiKeyObj = apiKeyObj;
    return next();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    next(err);
  }
};

/**
 * Check whether permissions associated with this api key contains a specific permission.
 *
 * @param permission - The permission to be checked.
 */
export const checkPermission = (permission: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const permissionsAssociatedWithApiKey = req.apiKeyObj?.permissions;
    if (!permissionsAssociatedWithApiKey) {
      return res.status(403).json({
        message: "Permission denied Error",
      });
    }

    const hasPermission = permissionsAssociatedWithApiKey.includes(
      permission as ApiKeyPermission,
    );
    if (!hasPermission) {
      return res.status(403).json({
        message: "Permission denied Error",
      });
    }

    return next();
  };
};

/**
 * Attach user's key token from x-client-id header.
 */
export const authenticateClientId = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    // Check whether userId is missing.
    const userId = req.headers[RequestHeaders.CLIENT_ID]?.toString();

    if (!userId) {
      throw new AuthenticationFailedAppError({
        code: ResCode.CLIENT_ID_REQUIRED,
      });
    }

    const user = await Users.findById(toObjectId(userId)).lean();

    if (!user) {
      throw new NotFoundAppError({
        code: ResCode.USER_IS_NOT_REGISTERED,
      });
    }

    return next();
  },
);

export const authenticateDeviceId = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const deviceId = req.headers[RequestHeaders.DEVICE_ID]?.toString();
  if (!deviceId) {
    throw new AuthenticationFailedAppError({
      code: ResCode.DEVICE_ID_REQUIRED,
    });
  }

  return next();
};

/**
 * Authenticate middlware to verify access token and attach user's details to request.
 */
export const authenticateAccessToken = composeMiddlewares([
  authenticateClientId,
  authenticateDeviceId,
  asyncWrapper(async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.headers[RequestHeaders.CLIENT_ID]?.toString() as string;
    const deviceId = req.headers[
      RequestHeaders.DEVICE_ID
    ]?.toString() as string;

    // Verify access token.
    const accessToken = req.headers[RequestHeaders.AUTHORIZATION]?.toString();
    if (!accessToken) {
      throw new AuthenticationFailedAppError({
        code: ResCode.ACCESS_TOKEN_REQUIRED,
      });
    }

    const decodedAccessTokenPayload = jwt.decode(
      accessToken,
    ) as AccessTokenPayload | null;
    if (!decodedAccessTokenPayload) {
      throw new AuthenticationFailedAppError({
        code: ResCode.ACCESS_TOKEN_REQUIRED,
      });
    }

    const session = await Sessions.findById(
      toObjectId(decodedAccessTokenPayload.sid),
    ).select("+publicKey");

    if (!session) {
      throw new UnauthorizedAppError();
    }

    if (session.expiresAt < new Date()) {
      await Sessions.findByIdAndDelete(session._id);
      throw new UnauthorizedAppError();
    }

    try {
      const payload = (await jwt.verify(
        accessToken,
        session.publicKey,
      )) as AccessTokenPayload;

      if (userId !== payload.uid) {
        throw new AuthenticationFailedAppError({
          code: ResCode.USER_INVALID,
        });
      }

      if (deviceId !== payload.did) {
        throw new AuthenticationFailedAppError({
          code: ResCode.DEVICE_ID_INVALID,
        });
      }

      // Attach key token instance to req.
      req.user = payload;

      return next();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      if (err instanceof jwt.TokenExpiredError) {
        throw new AuthenticationFailedAppError({
          code: ResCode.ACCESS_TOKEN_EXPIRED,
        });
      } else if (
        err instanceof jwt.JsonWebTokenError ||
        err instanceof AppError
      ) {
        throw new AuthenticationFailedAppError({
          code: ResCode.ACCESS_TOKEN_INVALID,
        });
      }

      throw err;
    }
  }),
]);
