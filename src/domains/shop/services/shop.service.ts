import _ from "lodash";
import { type ClientSession } from "mongoose";

import type { ShopLean } from "../types/shop.types.js";
import type {
  RegisterShopInput,
  UpdateShopInput,
} from "./types/shop.service.types.js";

import { BadRequestAppError } from "../../../core/error/badRequestAppError.js";
import { ResCode } from "../../../shared/constants/resCode.constants.js";
import { withTransaction } from "../../../shared/helpers/withTransaction.js";
import { toObjectId } from "../../../shared/utils/mongoose.utils.js";
import { USER_ROLE } from "../../access/constants/user.constants.js";
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

      return registeredShop;
    });
  }

  /**
   * Change shop's details.
   */
  static async updateShopInformation(input: UpdateShopInput) {
    const { shopId, ...payload } = input;

    const updatedShop = await ShopRepository.update({
      query: {
        _id: toObjectId(shopId),
      },
      update: _.pickBy(payload, _.identity),
    });

    if (!updatedShop) {
      throw new BadRequestAppError({
        code: ResCode.SHOP_UPDATE_INFORMATION_FAILURE,
      });
    }

    return updatedShop;
  }

  /**
   * Finds a registered shop by its email.
   */
  static findShopByEmail = async (email: string): Promise<ShopLean | null> => {
    const query = { email };

    return await ShopRepository.findOne({ query });
  };
}
