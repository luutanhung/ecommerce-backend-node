export const SHIPPING_PROVIDER = {
  GHN: "ghn",
} as const;

export const SHIPPING_STATUS = {
  // The merchant has received order, but it hasn't shipped yet.
  CONFIRMED: "CONFIRMED",

  // Items are packaged and verified for dispatch.
  PREPARING: "PREPARING",

  // The package left warehouse and is with courier.
  SHIPPING: "shipping",

  // The package is in your local area and is scheduled to be delivered today
  OUT_OF_DELIVERY: "OUT_OF_DELIVERY",

  // The package has successfully arrived at your specified address.
  DELIVERED: "delivered",

  // The packaged cannot be dropped off.
  FAILED: "FAILED",
} as const;
