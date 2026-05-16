import type { NextFunction, Request, Response } from "express";

import { RequestHeaders } from "../constants/http.constant.js";

import { findActiveApiKey } from "../services/apikey.service.js";

import type { ApiKeyPermission } from "../types/apikey.type.js";

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
