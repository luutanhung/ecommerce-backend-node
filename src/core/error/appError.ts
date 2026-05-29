import _ from "lodash";

import { HttpStatusCode } from "../../shared/constants/http.constants.js";
import type { AppErrorConstructorParams } from "../../shared/types/core/appError.type.js";
import type {
  AppData,
  ResponseCodeKey,
} from "../../shared/types/core/response.type.js";

/**
 * Custom error class for handling application-specific errors with consistent formatting.
 * Extends the native Error class to provide additional context like HTTP status codes,
 * response codes, and custom data payloads.
 */
export class AppError extends Error {
  /**
   * HTTP status code associated with the error (e.g., 400, 401, 404, 500).
   * Defaults to 400 (BAD_REQUEST) if not specified.
   */
  statusCode: number;

  /**
   * Application-specific response code used for client-side error handling and mapping.
   * Must be a valid key from the ResponseCodeKey type.
   */
  code: ResponseCodeKey;

  /**
   * Optional additional data payload providing more context about the error.
   * Can be used to include validation details, debug information, or custom error data.
   */
  data?: AppData;

  /**
   * Creates a new AppError instance with enhanced error context.
   * 
   * @param params - Error configuration parameters
   * @param params.code - Application-specific response code key
   * @param params.message - Human-readable error message (defaults to ResMsg[code])
   * @param params.statusCode - HTTP status code (defaults to HttpStatusCode.BAD_REQUEST)
   * @param params.data - Optional additional error data
   * 
   * @throws {AppError} Returns an AppError instance that can be thrown or passed to error handlers
   * 
   * @remarks
   * - The error message automatically uses the mapped message from ResMsg constant
     if no custom message is provided
   * - The prototype chain is properly maintained for `instanceof` checks
   * - The error name is set to the class name for better debugging
   */
  constructor({
    code,
    message,
    statusCode = HttpStatusCode.BAD_REQUEST,
    data,
  }: AppErrorConstructorParams) {
    super(message);

    this.code = code;
    this.statusCode = statusCode;

    if (!_.isUndefined(data)) {
      this.data = data;
    }

    this.name = this.constructor.name;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
