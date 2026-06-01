import _ from "lodash";

import type { UserLean } from "../types/user.types.js";

export class UserMapper {
  private static formatAddresses(addresses: UserLean["addresses"]) {
    return addresses.map((addr) =>
      _.pick(addr, [
        "addressLine",
        "isPrimary",
        "ward",
        "district",
        "province",
      ]),
    );
  }

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
      addresses: this.formatAddresses(user.addresses),
    };
  }
}
