import type { UserLean } from "../types/user.types.js";

export class UserMapper {
  static toAuthenticatedUser(user: UserLean) {
    return {
      id: user._id.toString(),
      email: user.email,
      name: user.name,
    };
  }

  static toProfile(user: UserLean) {
    return {
      id: user._id.toString(),
      email: user.email,
      name: user.name,
      addresses: user.addresses,
    };
  }
}
