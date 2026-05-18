import type { NextFunction, Request, Response } from "express";

import { asyncWrapper } from "../helpers/asyncWrapper.js";

export const attachLocale = asyncWrapper(
  (req: Request, res: Response, next: NextFunction) => {
    const acceptLanguage = req.headers["accept-language"]?.toString();

    req.locale = acceptLanguage?.startsWith("en") ? "en" : "vi";

    return next();
  },
);
