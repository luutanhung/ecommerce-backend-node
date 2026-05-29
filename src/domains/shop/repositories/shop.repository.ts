import { SHOP_STATUS } from "../constants/shop.constants.js";

import { Shops } from "../models/shop.model.js";

import type { ShopLean } from "../types/shop.types.js";
import type {
  CreateShopInput,
  FindShopRepositoryInput,
} from "./types/shop.repository.type.js";

import type { TransactionOptions } from "../../../shared/types/mongoose.type.js";
import { toObjectId } from "../../../shared/utils/mongoose.utils.js";

/**
 * ShopRepository
 *
 * @remark Shop repository receives domain entity objects.
 * @remark Repository returns lean objects.
 */
export class ShopRepository {
  /**
   * Creates a new shop.
   */
  static async create(
    input: CreateShopInput,
    options: TransactionOptions,
  ): Promise<ShopLean | null> {
    const { userId, name, slug, logo, status = SHOP_STATUS.ACTIVE } = input;
    const [createdShop] = await Shops.create(
      [
        {
          shopUser: toObjectId(userId),
          shopName: name,
          shopSlug: slug ?? undefined,
          shopLogo: logo ?? undefined,
          shopStatus: status,
        },
      ],
      {
        session: options.session,
      },
    );

    if (!createdShop) {
      return null;
    }

    return createdShop.toObject();
  }

  /**
   * Find one shop.
   */
  static async findOne({
    query,
  }: FindShopRepositoryInput): Promise<ShopLean | null> {
    return await Shops.findOne(query).lean();
  }
}
