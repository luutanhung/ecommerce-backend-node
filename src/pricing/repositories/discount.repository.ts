import type { PaginateResult } from "mongoose";

import type {
  FindDiscountRepositoryInput,
  FindDiscountsPaginatedRepositoryInput,
} from "../types/discount.repository.types.js";
import type { DiscountLean } from "../types/discount.types.js";

import { SortOrder } from "../../shared/constants/common.constants.js";
import {
  PAGINATION_DEFAULT_LIMIT,
  PAGINATION_DEFAULT_PAGE,
} from "../../shared/constants/pagination.constants.js";
import { buildSelect, buildSort } from "../../shared/utils/mongoose.utils.js";
import { Discounts } from "../discount.model.js";

export class DiscountRepository {
  /**
   * Find a single discount.
   */
  static async findOne({
    query = {},
  }: FindDiscountRepositoryInput): Promise<DiscountLean | null> {
    return await Discounts.findOne(query).lean();
  }

  /**
   * Find discounts.
   */
  static async findDiscountsPaginated({
    query = {},
    sortBy = "time",
    sortOrder = SortOrder.DESC,
    page = PAGINATION_DEFAULT_PAGE,
    limit = PAGINATION_DEFAULT_LIMIT,
    select,
  }: FindDiscountsPaginatedRepositoryInput) {
    const sortOptions = buildSort({
      sortBy,
      sortOrder,
    });

    const selectOptions = buildSelect(select);

    return (await Discounts.paginate(query, {
      page,
      limit,
      lean: true,
      sort: sortOptions,
      select: selectOptions,
    })) as PaginateResult<DiscountLean>;
  }
}
