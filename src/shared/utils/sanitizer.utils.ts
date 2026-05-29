import _ from "lodash";
import type { PaginateResult } from "mongoose";

export const pickFields = <
  T extends Record<string, unknown>,
  K extends keyof T,
>(
  fields: K[],
  obj: T,
): Pick<T, K> => {
  return _.pick(obj, fields) as Pick<T, K>;
};

/**
 * Sanitize paginated products.
 */
type Sanitizer<T, R> = (item: T) => R;

/**
 * Sanitize paginated result.
 */
export function sanitizePagination<T, R>(
  pagination: PaginateResult<T>,

  sanitizer: Sanitizer<T, R>,
): PaginateResult<R> {
  return {
    ...pagination,

    docs: pagination.docs.map(sanitizer),
  };
}
