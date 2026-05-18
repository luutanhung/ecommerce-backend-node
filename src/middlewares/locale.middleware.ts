import type { NextFunction, Request, Response } from "express";

import { Locale } from "../constants/locale.constants.js";

import { asyncWrapper } from "../helpers/asyncWrapper.js";

export const attachLocale = asyncWrapper(
  (req: Request, res: Response, next: NextFunction) => {
    const acceptLanguage = req.headers["accept-language"]?.toString();

    req.locale = acceptLanguage?.startsWith(Locale.ENGLISH)
      ? Locale.ENGLISH
      : Locale.VIETNAMESE;

    return next();
  },
);
