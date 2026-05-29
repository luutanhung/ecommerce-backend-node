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
} as const;

export const DISCOUNT_APPLIES_TO = {
  ALL: "ALL",

  PRODUCTS: "PRODUCTS",

  CATEGORIES: "CATEGORIES",
} as const;

export const DISCOUNT_SCOPE = {
  CART: "CART",
  PRODUCT: "PRODUCT",
  CATEGORY: "CATEGORY",
  USER: "USER",
} as const;
