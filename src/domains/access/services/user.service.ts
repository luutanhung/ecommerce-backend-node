import { Users } from "../models/user.model.js";

import type { UserDocument, UserLean } from "../types/user.types.js";
import type {
  AddAddressInput,
  AddRoleInput,
} from "./types/user.service.types.js";

import { BadRequestAppError } from "../../../core/error/badRequestAppError.js";
import { NotFoundAppError } from "../../../core/error/notFoundAppError.js";
import { ResCode } from "../../../shared/constants/resCode.constants.js";
import type { TransactionOptions } from "../../../shared/types/mongoose.type.js";
import { toObjectId } from "../../../shared/utils/mongoose.utils.js";
import { UserRepository } from "../repositories/user.repository.js";

export class UserService {
  private static async validateUser(userId: string): Promise<UserDocument> {
    const user = await Users.findOne({ _id: toObjectId(userId) });

    if (!user) {
      throw new NotFoundAppError({
        code: ResCode.USER_NOT_FOUND,
      });
    }

    return user;
  }

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

    return updatedUser;
  }

  /**
   * Add new user address.
   */
  static async addAddress({
    userId,
    addressLine,
    ward,
    district,
    province,
    isPrimary = false,
  }: AddAddressInput) {
    const user = await this.validateUser(userId);

    const addressExists = user.addresses.some(
      (item) =>
        item.addressLine.trim().toLowerCase() ===
        addressLine.trim().toLowerCase(),
    );

    if (addressExists) {
      throw new BadRequestAppError({
        code: ResCode.USER_ADDRESS_ALREADY_EXISTS,
      });
    }

    if (isPrimary) {
      user.addresses.forEach((addr) => {
        addr.isPrimary = false;
      });
    }

    user.addresses.push({
      addressLine,
      isPrimary,
      ward,
      district,
      province,
    });

    await user.save();

    return user.toObject();
  }

  /**
   * Find user by email.
   */
  static async findUserByEmail(email: string): Promise<UserLean | null> {
    const query = { email };

    return await UserRepository.findUser({ query });
  }
}
