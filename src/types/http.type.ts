import { HttpStatusCode } from "../constants/http.constant.js";

export type HttpStatusCodeKey = keyof typeof HttpStatusCode;

export type OutgoingHttpHeaders = Record<string, string | string[] | undefined>;
