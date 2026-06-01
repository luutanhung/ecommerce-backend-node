import {
  DISCOUNT_APPLIES_TO,
  DISCOUNT_TYPE,
} from "../constants/discount.constants.js";

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
import type { CheckoutProductInput } from "../../domains/order/types/order.service.types.js";
import { ProductRepository } from "../../domains/product/repositories/product.repository.js";
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
    const { shopId, code } = input;

    const discount = await Discounts.findOne({
      discountCode: code,
      discountShop: toObjectId(shopId),
    }).lean();

    if (discount && discount.isActive) {
      throw new ConflictAppError({
        code: ResCode.DISCOUNT_WITH_CODE_ALREADY_EXISTS,
      });
    }

    const [createdShopDiscount] = await Discounts.create(
      [
        {
          ...input,
          shop: toObjectId(shopId),
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

  private static validateDiscountAvailability(discount: DiscountLean) {
    if (!discount.isActive) {
      throw new BadRequestAppError({
        code: ResCode.DISCOUNT_NOT_ACTIVE,
      });
    }

    const now = Date.now();

    if (now < discount.startsAt.getTime()) {
      throw new BadRequestAppError({
        code: ResCode.DISCOUNT_NOT_STARTED,
      });
    }

    if (now > discount.endsAt.getTime()) {
      throw new BadRequestAppError({
        code: ResCode.DISCOUNT_EXPIRED,
      });
    }

    if (discount.usedCount >= discount.usageLimit) {
      throw new BadRequestAppError({
        code: ResCode.DISCOUNT_LIMIT_REACHED,
      });
    }
  }

  private static getEligibleProducts(
    discount: DiscountLean,
    products: CheckoutProductInput[],
  ) {
    switch (discount.appliesTo) {
      case DISCOUNT_APPLIES_TO.ALL:
        return products;

      case DISCOUNT_APPLIES_TO.PRODUCT:
        return products.filter((product) =>
          discount.applicableProducts.some(
            (id) => id.toString() === product.productId,
          ),
        );

      case DISCOUNT_APPLIES_TO.CATEGORY:
        return products;

      default:
        throw new BadRequestAppError({
          code: ResCode.DISCOUNT_APPLIES_TO_NOT_SUPPORTED,
        });
    }
  }

  private static calculateEligibleAmount(products: CheckoutProductInput[]) {
    return products.reduce((total, product) => {
      return total + product.price * product.quantity;
    }, 0);
  }

  private static calculateDiscountAmount(
    discount: DiscountLean,
    eligibleAmount: number,
  ) {
    const discountType = discount.type;
    switch (discountType) {
      case DISCOUNT_TYPE.FIXED_AMOUNT: {
        return (discount.config as FixedAmountDiscountConfig).amount;
      }

      case DISCOUNT_TYPE.PERCENTAGE: {
        const { percent, maxDiscountAmount } =
          discount.config as PercentageDiscountConfig;

        let amount = (eligibleAmount * percent) / 100;

        if (maxDiscountAmount && amount > maxDiscountAmount) {
          amount = maxDiscountAmount;
        }

        return amount;
      }

      default:
        throw new BadRequestAppError({
          code: ResCode.DISCOUNT_TYPE_NOT_SUPPORTED,
        });
    }
  }

  /**
   * Apply discount to products.
   */
  static async applyDiscountToProducts({
    shopId,
    code,
    products,
  }: ApplyDiscountToProductsInput) {
    const discount = await DiscountRepository.findOne({
      query: {
        shop: toObjectId(shopId),
        code,
      },
    });

    if (!discount) {
      throw new NotFoundAppError({
        code: ResCode.DISCOUNT_NOT_FOUND,
      });
    }

    this.validateDiscountAvailability(discount);

    const eligibleProducts = this.getEligibleProducts(discount, products);
    const eligibleAmount = this.calculateEligibleAmount(eligibleProducts);

    const minOrderTotal = discount.minOrderTotal;
    if (minOrderTotal && eligibleAmount < minOrderTotal) {
      throw new BadRequestAppError({
        code: ResCode.DISCOUNT_MIN_ORDER_VALUE_NOT_MET,
      });
    }

    const discountAmount = this.calculateDiscountAmount(
      discount,
      eligibleAmount,
    );

    return {
      discountId: discount._id.toString(),
      discountCode: discount.code,
      eligibleAmount,
      discountAmount,
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

    if (foundDiscount.isActive === false) {
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

    const { appliesTo, applicableProducts } = foundActiveDiscount;

    const query: Record<string, unknown> = {
      productShop: toObjectId(shopId),
      isPublished: true,
    };

    if (appliesTo === DISCOUNT_APPLIES_TO.PRODUCT) {
      query._id = {
        $in: applicableProducts,
      };
    }

    return await ProductRepository.findPaginated({
      filters: query,
      options: {
        page,
        limit,
        select: ["productName"],
      },
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

    if (!foundDiscount || !foundDiscount.isActive) {
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
