import type { QueryFilter, UpdateQuery } from "mongoose";

import type {
  SelectFields,
  SortOptions,
} from "../../../shared/types/common.type.js";
import type { PartialPaginationQuery } from "../../../shared/validations/pagination.validations.js";

import type { Discount } from "./discount.types.js";

export type DiscountFilterQuery = QueryFilter<Discount>;
export type DiscountUpdateQuery = UpdateQuery<Discount>;

export type FindDiscountRepositoryInput = {
  query?: DiscountFilterQuery;
};

export type FindDiscountsPaginatedRepositoryInput = Partial<SortOptions> &
  PartialPaginationQuery & {
    query?: DiscountFilterQuery;
  } & SelectFields;
