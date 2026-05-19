import type { NextFunction, Request, RequestHandler, Response } from "express";
import type { ParamsDictionary, Query } from "express-serve-static-core";
import type { ZodType } from "zod";
import { ZodError } from "zod";

import { ResCode } from "../../constants/resCode.constants.js";
import { BadRequestAppError } from "../../core/error/badRequestAppError.js";
import { InternalSystemError } from "../../core/error/internalSystemError.js";
import type { ResponseCodeKey } from "../../types/core/response.type.js";
import { asyncWrapper } from "../helpers/asyncWrapper.js";

type ValidationSchemas = {
  params?: ZodType<ParamsDictionary>;
  query?: ZodType<Query>;
  body?: ZodType;
};

export async function parseSchema<T>(
  schema: ZodType<T>,
  data: unknown,
): Promise<T> {
  try {
    return await schema.parseAsync(data);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    if (err instanceof ZodError) {
      const firstValidationIssue = err?.issues[0];
      const validationErrorResponseCodeKey =
        firstValidationIssue?.message as ResponseCodeKey;

      if (
        validationErrorResponseCodeKey &&
        Object.values(ResCode).includes(validationErrorResponseCodeKey)
      ) {
        throw new BadRequestAppError({
          code: validationErrorResponseCodeKey,
          data: err,
        });
      }

      throw new BadRequestAppError({ data: err });
    }
    throw new InternalSystemError({ data: err });
  }
}

/**
 * Intercepts incoming requests to verify they conform to expected schemas before reaching main route logic.
 */
export const validateRequest = (schemas: ValidationSchemas): RequestHandler => {
  return asyncWrapper(
    async (req: Request, res: Response, next: NextFunction) => {
      if (schemas.params) {
        const parsedParams = await parseSchema<ParamsDictionary>(
          schemas.params,
          req.params,
        );

        Object.assign(req.params, parsedParams);
      }

      if (schemas.query) {
        const parsedQuery = await parseSchema<Query>(schemas.query, req.query);

        Object.assign(req.query, parsedQuery);
      }

      if (schemas.body) {
        const parsedBody = await parseSchema(schemas.body, req.body);

        Object.assign(req.body, parsedBody);
      }

      return next();
    },
  );
};
