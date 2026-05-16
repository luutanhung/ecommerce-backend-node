import type { NextFunction, Request, Response } from "express";

import { REQUEST_HEADERS } from "../constants/http.constant.js";

import { findActiveApiKey } from "../services/apikey.service.js";

export const authenticateApiKey = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const apiKey = req.headers[REQUEST_HEADERS.API_KEY]?.toString();
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
