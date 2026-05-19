import type { Request } from "express";
import type { ParsedQs } from "qs";

import { HttpStatusCode } from "../constants/http.constants.js";

export type HttpStatusCodeKey = keyof typeof HttpStatusCode;

export type OutgoingHttpHeaders = Record<string, string | string[] | undefined>;

export type TypedRequest<
  Params = Record<string, string>,
  Body = unknown,
  Query = ParsedQs,
> = Request<Params, unknown, Body, Query>;

export type BodyRequest<T> = Request<Record<string, never>, unknown, T>;

export type ParamsRequest<T> = Request<T>;

export type QueryRequest<T> = Request<
  Record<string, never>,
  unknown,
  unknown,
  T
>;
