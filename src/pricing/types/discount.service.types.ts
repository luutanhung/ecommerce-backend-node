import type { ProductType } from "../../domains/product/types/product.type.js";

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
