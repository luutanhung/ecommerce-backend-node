import type { UserLean } from "../types/access.type.js";

import { UserRepository } from "../repositories/user.repository.js";

export class UserService {
  static async findUserByEmail(email: string): Promise<UserLean | null> {
    const query = { email };

    return await UserRepository.findUser({ query });
  }
}
