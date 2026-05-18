import type { Request } from "express";

import { HttpStatusCode } from "../constants/http.constants.js";

export type HttpStatusCodeKey = keyof typeof HttpStatusCode;

export type OutgoingHttpHeaders = Record<string, string | string[] | undefined>;

export type BodyRequest<T> = Request<Record<string, never>, unknown, T>;

export type ParamsRequest<T> = Request<T>;

export type QueryRequest<T> = Request<
  Record<string, never>,
  unknown,
  unknown,
  T
>;
