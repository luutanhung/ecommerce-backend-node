import _ from "lodash";

import { DISCOUNT_APPLIES_TO } from "../constants/discount.constants.js";
import { DISCOUNT_TYPE } from "../constants/discount.constants.js";

import type {
  ApplyDiscountToProductsInput,
  CancelDiscountByDiscountCodeInput,
  CreateShopDiscountInput,
  DeleteDiscountByDiscountCodeInput,
  FindApplicableProductsByDiscountCodeInput,
  FindDiscountsByShopInput,
  FindShopDiscountByDiscountCodeInput,
} from "../types/discount.service.types.js";
import type {
  DiscountLean,
  FixedAmountDiscountConfig,
  PercentageDiscountConfig,
} from "../types/discount.types.js";

import { BadRequestAppError } from "../../core/error/badRequestAppError.js";
import { ConflictAppError } from "../../core/error/conflictAppError.js";
import { NotFoundAppError } from "../../core/error/notFoundAppError.js";
import { ProductRepository } from "../../domains/product/product.repository.js";
import {
  PAGINATION_DEFAULT_LIMIT,
  PAGINATION_DEFAULT_PAGE,
} from "../../shared/constants/pagination.constants.js";
import { ResCode } from "../../shared/constants/resCode.constants.js";
import type { TransactionOptions } from "../../shared/types/mongoose.type.js";
import { toObjectId } from "../../shared/utils/mongoose.utils.js";
import { sanitizePagination } from "../../shared/utils/sanitizer.utils.js";
import { Discounts } from "../discount.model.js";
import { DiscountRepository } from "../repositories/discount.repository.js";
import { sanitizeDiscount } from "../sanitizers/discount.sanitizer.js";

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
      config,
      scope,
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
    }).lean();

    if (foundDiscountWithCode && foundDiscountWithCode.discountIsActive) {
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
          discountConfig: config,
          discountScope: scope,
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

  /**
   * Apply discount to products.
   */
  static async applyDiscountToProducts({
    shopId,
    code,
  }: ApplyDiscountToProductsInput) {
    const foundActiveDiscount = await DiscountRepository.findDiscount({
      query: {
        shopId: toObjectId(shopId),
        discountCode: code,
      },
    });

    const {
      discountIsActive,
      discountUsageLimit,
      discountStartsAt,
      discountEndsAt,
      discountMinOrderValue,
      discountType,
      discountConfig,
      discountUsedCount,
    } = foundActiveDiscount;

    if (discountIsActive === false) {
      throw new BadRequestAppError({
        code: ResCode.DISCOUNT_EXPIRED,
      });
    }

    if (discountUsedCount >= discountUsageLimit) {
      throw new BadRequestAppError({
        code: ResCode.DISCOUNT_LIMIT_REACHED,
      });
    }

    const currentTime = new Date().getTime();
    const startTime = new Date(discountStartsAt).getTime();
    const endTime = new Date(discountEndsAt).getTime();

    if (currentTime < startTime) {
      throw new BadRequestAppError({
        code: ResCode.DISCOUNT_NOT_STARTED,
      });
    }

    if (currentTime > endTime) {
      throw new BadRequestAppError({
        code: ResCode.DISCOUNT_EXPIRED,
      });
    }

    /**
     * Get grand total from order.
     */
    const grandTotal: number = 0;

    if (discountMinOrderValue > 0) {
      if (grandTotal < discountMinOrderValue) {
        throw new BadRequestAppError({
          code: ResCode.DISCOUNT_MIN_ORDER_VALUE_NOT_MET,
        });
      }
    }

    let discountAmount: number = 0;
    if (discountType === DISCOUNT_TYPE.FIXED_AMOUNT) {
      discountAmount = (discountConfig as FixedAmountDiscountConfig).amount;
    } else if (discountType === DISCOUNT_TYPE.PERCENTAGE) {
      const { percent, maxDiscountAmount } =
        discountConfig as PercentageDiscountConfig;
      discountAmount = (grandTotal * percent) / 100;
      discountAmount =
        !_.isNil(maxDiscountAmount) && discountAmount >= maxDiscountAmount
          ? maxDiscountAmount
          : discountAmount;
    }

    const remainingBalance: number = grandTotal - discountAmount;

    return {
      grandTotal,
      discountAmount,
      remainingBalance,
    };
  }

  /**
   * Delete a discount.
   */
  static async deleteDiscountByDiscountCode({
    shopId,
    code,
  }: DeleteDiscountByDiscountCodeInput): Promise<DiscountLean> {
    const deletedDiscount = await Discounts.findOneAndDelete({
      discountShop: toObjectId(shopId),
      discountCode: code,
    }).lean();

    if (!deletedDiscount) {
      throw new NotFoundAppError({
        code: ResCode.DISCOUNT_NOT_FOUND,
      });
    }

    return deletedDiscount;
  }

  /**
   * Cancel discount.
   */
  static async cancelDiscountByDiscountCode({
    shopId,
    code,
    userId,
  }: CancelDiscountByDiscountCodeInput) {
    const foundDiscount = await Discounts.findOne({
      discountShop: toObjectId(shopId),
      discountCode: code,
    });

    if (!foundDiscount) {
      throw new NotFoundAppError({
        code: ResCode.DISCOUNT_NOT_FOUND,
      });
    }

    if (foundDiscount.discountIsActive === false) {
      throw new BadRequestAppError({
        code: ResCode.DISCOUNT_NOT_ACTIVE,
      });
    }

    const updatedDiscount = (await Discounts.findByIdAndUpdate(
      foundDiscount._id,
      {
        $pull: {
          discountUsersUsed: userId,
        },
        $inc: {
          discountUsageLimit: 1,
          discountUsedCount: -1,
        },
      },
    )) as DiscountLean;

    return updatedDiscount;
  }

  /**
   * Find applicable products with discount code.
   */
  static async findApplicableProductsByDiscountCode({
    shopId,
    code,
    page = PAGINATION_DEFAULT_PAGE,
    limit = PAGINATION_DEFAULT_LIMIT,
  }: FindApplicableProductsByDiscountCodeInput) {
    const foundActiveDiscount = await this.findShopDiscountByDiscountCode({
      shopId,
      code,
    });

    const { discountAppliesTo, discountApplicableProducts } =
      foundActiveDiscount;

    const query: Record<string, unknown> = {
      productShop: toObjectId(shopId),
      isPublished: true,
    };

    if (discountAppliesTo === DISCOUNT_APPLIES_TO.PRODUCTS) {
      query._id = {
        $in: discountApplicableProducts,
      };
    }

    return await ProductRepository.findProducts({
      query,
      page,
      limit,
      select: ["productName"],
    });
  }

  /**
   * Find shop discount.
   */
  static async findShopDiscountByDiscountCode({
    shopId,
    code,
  }: FindShopDiscountByDiscountCodeInput): Promise<DiscountLean> {
    const foundDiscount = await Discounts.findOne({
      discountShop: toObjectId(shopId),
      discountCode: code,
    }).lean();

    if (!foundDiscount || !foundDiscount.discountIsActive) {
      throw new NotFoundAppError({
        code: ResCode.DISCOUNT_NOT_FOUND,
      });
    }

    return foundDiscount;
  }

  /**
   * Find discounts by shop.
   */
  static async findDiscountsByShop({
    shopId,
    page,
    limit,
  }: FindDiscountsByShopInput) {
    const query: Record<string, unknown> = {
      discountShop: toObjectId(shopId),
    };

    const paginationResult = await DiscountRepository.findDiscountsPaginated({
      query,
      page,
      limit,
    });

    return sanitizePagination(paginationResult, sanitizeDiscount);
  }
}
