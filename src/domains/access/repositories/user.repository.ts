import { Users } from "../models/user.model.js";

import type { UserLean } from "../types/access.type.js";
import type { FindUserRepositoryInput } from "../types/user.repository.type.js";

export class UserRepository {
  static async findUser({
    query,
  }: FindUserRepositoryInput): Promise<UserLean | null> {
    return await Users.findOne(query).lean();
  }
}
