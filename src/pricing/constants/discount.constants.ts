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

  /**
   * Buy 2 get 1 free.
   * Buy 1 get 50% off second item.
   */
  BUY_X_GET_Y: "BUY_X_GET_Y",

  /**
   * Apply to whole cart.
   * 15% off entire cart.
   */
  CART_DISCOUNT: "CART_DISCOUNT",

  /**
   * iPhone 10% off
   */
  PRODUCT_DISCOUNT: "PRODUCT_DISCOUNT",

  /**
   * 20% off all electronics
   */
  CATEGORY_DISCOUNT: "CATEGORY_DISCOUNT",

  /**
   * VIP customers get 10%
   */
  USER_DISCOUNT: "USER_DISCOUNT",

  /**
   * Black Friday sale
   */
  SEASONAL_DISCOUNT: "SEASONAL_DISCOUNT",
} as const;

export const DISCOUNT_APPLIES_TO = {
  ALL: "all",

  PRODUCTS: "products",

  CATEGORIES: "categories",
} as const;
