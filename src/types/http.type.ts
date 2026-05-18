import { HttpStatusCode } from "../constants/http.constants.js";

export type HttpStatusCodeKey = keyof typeof HttpStatusCode;

export type OutgoingHttpHeaders = Record<string, string | string[] | undefined>;
