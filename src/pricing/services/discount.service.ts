import { DISCOUNT_APPLIES_TO } from "../constants/discount.constants.js";

import type { CreateShopDiscountInput } from "../types/discount.service.types.js";

import { ResCode } from "../../constants/resCode.constants.js";
import { BadRequestAppError } from "../../core/error/badRequestAppError.js";
import { ConflictAppError } from "../../core/error/conflictAppError.js";
import { toObjectId } from "../../shared/utils/mongoose.utils.js";
import type { TransactionOptions } from "../../types/mongoose.type.js";
import { Discounts } from "../discount.model.js";

export class DiscountService {
  /**
   * Create a new shop discount.
   */
  static async createShopDiscount(
    input: CreateShopDiscountInput,
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

    const foundDiscountWithCode = await Discounts.findOne({
      discountCode: code,
      discountShop: toObjectId(shopId),
    });

    if (foundDiscountWithCode) {
      throw new ConflictAppError({
        code: ResCode.DISCOUNT_WITH_CODE_ALREADY_EXISTS,
      });
    }

    const [createdShopDiscount] = await Discounts.create(
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

    if (!createdShopDiscount) {
      throw new BadRequestAppError({
        code: ResCode.DISCOUNT_CREATE_FAILED,
      });
    }

    return createdShopDiscount;
  }
}
