import type { UserRole } from "./access.type.js";

export type AddRoleInput = {
  userId: string;
  role: UserRole;
};
