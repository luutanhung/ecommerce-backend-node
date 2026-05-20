import { Users } from "../models/user.model.js";

import type { UserLean } from "../types/access.type.js";
import type {
  FindUserRepositoryInput,
  UpdateUserRepositoryInput,
} from "../types/user.repository.type.js";

import type { TransactionOptions } from "../../../types/mongoose.type.js";

export class UserRepository {
  static async updateUser(
    { query, update }: UpdateUserRepositoryInput,
    options: TransactionOptions = {},
  ): Promise<UserLean | null> {
    return await Users.findOneAndUpdate(query, update, {
      runValidators: true,
      session: options?.session,
    }).lean();
  }
  /**
   * Find a user.
   */
  static async findUser({
    query,
  }: FindUserRepositoryInput): Promise<UserLean | null> {
    return await Users.findOne(query).lean();
  }
}
