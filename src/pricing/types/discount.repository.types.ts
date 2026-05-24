import type { QueryFilter, UpdateQuery } from "mongoose";

import type { PartialPaginationQuery } from "../../shared/validations/pagination.validations.js";
import type { SelectFields, SortOptions } from "../../types/common.type.js";

import type { Discount } from "./discount.types.js";

export type DiscountFilterQuery = QueryFilter<Discount>;
export type DiscountUpdateQuery = UpdateQuery<Discount>;

export type FindDiscountsPaginatedRepositoryInput = Partial<SortOptions> &
  PartialPaginationQuery & {
    query?: DiscountFilterQuery;
  } & SelectFields;
