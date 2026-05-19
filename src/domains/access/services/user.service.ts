import { Users } from "../models/user.model.js";

import type { UserLean } from "../types/access.type.js";

export class UserService {
  static async findUserByEmail(email: string): Promise<UserLean | null> {
    return await Users.findOne({ email }).lean();
  }
}
