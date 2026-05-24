import { DISCOUNT_APPLIES_TO } from "../constants/discount.constants.js";

import type {
  CreateShopDiscountInput,
  FindApplicableProductsByDiscountCodeInput,
  FindShopDiscountByDiscountCodeInput,
} from "../types/discount.service.types.js";
import type { DiscountLean } from "../types/discount.types.js";

import {
  PAGINATION_DEFAULT_LIMIT,
  PAGINATION_DEFAULT_PAGE,
} from "../../constants/pagination.constants.js";
import { ResCode } from "../../constants/resCode.constants.js";
import { BadRequestAppError } from "../../core/error/badRequestAppError.js";
import { ConflictAppError } from "../../core/error/conflictAppError.js";
import { NotFoundAppError } from "../../core/error/notFoundAppError.js";
import { ProductRepository } from "../../domains/product/product.repository.js";
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
}
