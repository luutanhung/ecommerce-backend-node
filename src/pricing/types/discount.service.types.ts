import type { ProductType } from "../../domains/product/types/product.type.js";
import type { PaginationQuery } from "../../shared/validations/pagination.validations.js";

import type { DiscountAppliesTo, DiscountType } from "./discount.types.js";

export type CreateShopDiscountInput = {
  shopId: string;
  name: string;
  description: string;
  type: DiscountType;
  value: number;
  code: string;
  startsAt: Date;
  endsAt: Date;
  usageLimit: number;
  usageLimitPerUser: number;
  minOrderValue?: number;
  appliesTo?: DiscountAppliesTo;
  applicableProducts?: string[];
  applicableCategories?: ProductType[];
};

export type FindShopDiscountByDiscountCodeInput = {
  shopId: string;
  code: string;
};

export type FindApplicableProductsByDiscountCodeInput = PaginationQuery & {
  shopId: string;
  code: string;
};

export type FindDiscountsByShopInput = PaginationQuery & {
  shopId: string;
};

export type ApplyDiscountToProductsInput = {
  shopId: string;
  code: string;
};
