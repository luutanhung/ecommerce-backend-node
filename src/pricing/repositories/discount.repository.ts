import type { PaginateResult } from "mongoose";

import type {
  FindDiscountRepositoryInput,
  FindDiscountsPaginatedRepositoryInput,
} from "../types/discount.repository.types.js";
import type { DiscountLean } from "../types/discount.types.js";

import { SortOrder } from "../../constants/common.constants.js";
import {
  PAGINATION_DEFAULT_LIMIT,
  PAGINATION_DEFAULT_PAGE,
} from "../../constants/pagination.constants.js";
import { ResCode } from "../../constants/resCode.constants.js";
import { NotFoundAppError } from "../../core/error/notFoundAppError.js";
import { buildSelect, buildSort } from "../../shared/utils/mongoose.utils.js";
import { Discounts } from "../discount.model.js";
import { DEFAULT_DISCOUNT_SELECT_FIELDS } from "../sanitizers/discount.sanitizer.js";

export class DiscountRepository {
  /**
   * Find a single discount.
   */
  static async findDiscount({
    query = {},
  }: FindDiscountRepositoryInput): Promise<DiscountLean> {
    const foundDiscount = await Discounts.findOne(query).lean();

    if (!foundDiscount) {
      throw new NotFoundAppError({
        code: ResCode.DISCOUNT_NOT_FOUND,
      });
    }

    return foundDiscount;
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
    select = DEFAULT_DISCOUNT_SELECT_FIELDS,
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
