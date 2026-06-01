import type { UserRole } from "../../types/user.types.js";

export type AddRoleInput = {
  userId: string;
  role: UserRole;
};

export type AddAddressInput = {
  userId: string;
  addressLine: string;
  ward?: string;
  district?: string;
  province?: string;
  isPrimary?: boolean;
};
