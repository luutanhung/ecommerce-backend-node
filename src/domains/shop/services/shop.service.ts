import { type ClientSession } from "mongoose";

import type { RegisterShopInput, ShopLean } from "../types/shop.type.js";

import { BadRequestAppError } from "../../../core/error/badRequestAppError.js";
import { ResCode } from "../../../shared/constants/resCode.constants.js";
import { withTransaction } from "../../../shared/helpers/withTransaction.js";
import { sanitizeShop } from "../../../shared/utils/sanitizer.utils.js";
import { USER_ROLE } from "../../access/constants/access.constants.js";
import { UserService } from "../../access/services/user.service.js";
import { ShopRepository } from "../repositories/shop.repository.js";

/**
 * @remark Shop service returns sanitized object.
 */
export class ShopService {
  /**
   * Users register their shops.
   */
  static async registerShop(input: RegisterShopInput) {
    return await withTransaction(async (session: ClientSession) => {
      const registeredShop = await ShopRepository.create(input, {
        session,
      });

      if (!registeredShop) {
        throw new BadRequestAppError({
          code: ResCode.SHOP_REGISTER_FAILED,
        });
      }

      await UserService.addRole(
        {
          userId: input.userId,
          role: USER_ROLE.SHOP_OWNER,
        },
        {
          session,
        },
      );

      return sanitizeShop(registeredShop);
    });
  }

  /**
   * Finds a registered shop by its email.
   */
  static findShopByEmail = async (email: string): Promise<ShopLean | null> => {
    const query = { email };

    return await ShopRepository.findOne({ query });
  };
}
