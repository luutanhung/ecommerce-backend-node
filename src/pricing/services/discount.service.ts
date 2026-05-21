import { DISCOUNT_APPLIES_TO } from "../constants/discount.constants.js";

import type { CreateDiscountInput } from "../types/discount.service.types.js";

import { ResCode } from "../../constants/resCode.constants.js";
import { BadRequestAppError } from "../../core/error/badRequestAppError.js";
import { toObjectId } from "../../shared/utils/mongoose.utils.js";
import type { TransactionOptions } from "../../types/mongoose.type.js";
import { Discounts } from "../discount.model.js";

export class DiscountService {
  static async createDiscount(
    input: CreateDiscountInput,
    options: TransactionOptions = {},
  ) {
    const {
      shopId,
      name,
      description,
      type,
      value,
      code,
      startsAt,
      endsAt,
      usageLimit,
      usageLimitPerUser,
      minOrderValue = 0,
      appliesTo = DISCOUNT_APPLIES_TO.ALL,
      applicableProducts = [],
      applicableCategories = [],
    } = input;

    const [createdDiscount] = await Discounts.create(
      [
        {
          discountShop: toObjectId(shopId),
          discountName: name,
          discountDescription: description,
          discountType: type,
          discountValue: value,
          discountCode: code,
          discountStartsAt: startsAt,
          discountEndsAt: endsAt,
          discountUsageLimit: usageLimit,
          discountUsageLimitPerUser: usageLimitPerUser,
          discountMinOrderValue: minOrderValue,
          discountAppliesTo: appliesTo,
          discountApplicableProducts: applicableProducts,
          discountApplicableCategories: applicableCategories,
        },
      ],
      {
        session: options.session,
      },
    );

    if (!createdDiscount) {
      throw new BadRequestAppError({
        code: ResCode.DISCOUNT_CREATE_FAILED,
      });
    }

    return createdDiscount;
  }
}
