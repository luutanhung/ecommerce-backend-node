import type { UserLean } from "../types/access.types.js";
import type { AddRoleInput } from "./types/user.service.types.js";

import { NotFoundAppError } from "../../../core/error/notFoundAppError.js";
import { ResCode } from "../../../shared/constants/resCode.constants.js";
import type { TransactionOptions } from "../../../shared/types/mongoose.type.js";
import { toObjectId } from "../../../shared/utils/mongoose.utils.js";
import { sanitizeUser } from "../../../shared/utils/sanitizer.utils.js";
import { UserRepository } from "../repositories/user.repository.js";

export class UserService {
  /**
   * Add a new role.
   */
  static async addRole(
    { userId, role }: AddRoleInput,
    options: TransactionOptions = {},
  ) {
    const query = {
      _id: toObjectId(userId),
    };
    const update = {
      $addToSet: {
        roles: role,
      },
    };

    const updatedUser = await UserRepository.updateUser(
      {
        query,
        update,
      },
      options,
    );

    if (!updatedUser) {
      throw new NotFoundAppError({
        code: ResCode.USER_NOT_FOUND,
      });
    }

    return sanitizeUser(updatedUser);
  }

  /**
   * Find user by email.
   */
  static async findUserByEmail(email: string): Promise<UserLean | null> {
    const query = { email };

    return await UserRepository.findUser({ query });
  }
}
