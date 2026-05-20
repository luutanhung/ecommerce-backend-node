import { type ClientSession } from "mongoose";

import type { RegisterShopInput, ShopLean } from "./types/shop.type.js";

import { ResCode } from "../../constants/resCode.constants.js";
import { BadRequestAppError } from "../../core/error/badRequestAppError.js";
import { withTransaction } from "../../shared/helpers/withTransaction.js";
import { sanitizeShop } from "../../shared/utils/sanitizer.utils.js";
import { UserRole } from "../access/constants/access.constants.js";
import { UserService } from "../access/services/user.service.js";

import { Shop } from "./entities/shop.entity.js";

import { ShopRepository } from "./shop.repository.js";

/**
 * @remark Shop service returns sanitized object.
 */
export class ShopService {
  /**
   * Users register their shops.
   */
  static async registerShop(payload: RegisterShopInput) {
    return await withTransaction(async (session: ClientSession) => {
      const shop: Shop = Shop.create(payload);

      const registeredShop = await ShopRepository.createShop(shop, {
        session,
      });

      if (!registeredShop) {
        throw new BadRequestAppError({
          code: ResCode.SHOP_REGISTER_FAILED,
        });
      }

      await UserService.addRole(
        {
          userId: payload.shopOwner,
          role: UserRole.SHOP_OWNER,
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
    return await ShopRepository.findShop({ query });
  };
}
