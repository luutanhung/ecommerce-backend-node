export const UserRole = {
  // Platform / System Level
  SUPER_ADMIN: "super_admin",
  PLATFORM_SUPPORT: "platform_support",

  // Merchant / Shop Level (Multi-tenant)
  SHOP_OWNER: "shop_owner",
  SHOP_MANAGER: "shop_manager",
  SHOP_STAFF: "shop_staff",

  // End-User Level
  CUSTOMER: "customer",
} as const;
