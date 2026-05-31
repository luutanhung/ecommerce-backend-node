import type { UserRole } from "../../types/access.types.js";

export type AddRoleInput = {
  userId: string;
  role: UserRole;
};

export type AddAddressInput = {
  userId: string;
  address: string;
  isPrimary?: boolean;
};
