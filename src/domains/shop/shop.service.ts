import type { RegisterShopInput, ShopLean } from "./types/shop.type.js";

import { sanitizeShop } from "../../shared/utils/sanitizer.utils.js";
import { UserRole } from "../access/constants/access.constants.js";
import { UserService } from "../access/services/user.service.js";

import { Shops } from "./shop.model.js";

export class ShopService {
  /**
   * Users register their shops.
   */
  static async registerShop(payload: RegisterShopInput) {
    const registeredShop = await Shops.create(payload);

    await UserService.addRole({
      userId: payload.shopOwner,
      role: UserRole.SHOP_OWNER,
    });

    return sanitizeShop(registeredShop);
  }

  /**
   * Finds a registered shop by its email.
   */
  static findShopByEmail = async (email: string): Promise<ShopLean | null> => {
    return await Shops.findOne({ email }).lean();
  };
}
