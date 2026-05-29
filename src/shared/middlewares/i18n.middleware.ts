import type { NextFunction, Request, Response } from "express";

import type { Locale } from "../types/locale.type.js";

import { i18n } from "../../configs/i18n.js";

// import type { Locale } from "../types/locale.type.js";

export const i18nMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // Priority order:
  // 1. Query parameter (?lang=en)
  // 2. Cookie (lang)
  // 3. Accept-Language header

  i18n.init(req, res);

  let locale: Locale = "en";

  // 1. Query parameter
  if (
    typeof req.query.lang === "string" &&
    i18n.getLocales().includes(req.query.lang)
  ) {
    locale = req.query.lang as Locale;
  }

  // 2. Cookie
  else if (req.cookies?.lang && i18n.getLocales().includes(req.cookies.lang)) {
    locale = req.cookies.lang as Locale;
  }

  // 3. Accept-Language header
  else {
    const header = req.headers["accept-language"];

    if (header && typeof header === "string") {
      // Safely parse the language code (e.g., "en-US" -> "en")
      const parsed = header.split(",")[0]?.split("-")[0] as string;

      if (i18n.getLocales().includes(parsed)) {
        locale = parsed as Locale;
      }
    }
  }
  req.setLocale(locale);

  next();
};
