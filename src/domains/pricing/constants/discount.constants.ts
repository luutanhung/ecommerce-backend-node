export const DISCOUNT_TYPE = {
  /**
   * 10% off entire cart.
   * 30% off product.
   */
  PERCENTAGE: "PERCENTAGE",

  /**
   * $10 off order total.
   */
  FIXED_AMOUNT: "FIXED_AMOUNT",
} as const;

export const DISCOUNT_APPLIES_TO = {
  ALL: "ALL",

  PRODUCT: "PRODUCT",

  CATEGORY: "CATEGORY",

  USER: "USER",
} as const;
