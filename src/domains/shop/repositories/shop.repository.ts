import { SHOP_STATUS } from "../constants/shop.constants.js";

import { Shops } from "../models/shop.model.js";

import type { ShopLean } from "../types/shop.types.js";
import type {
  CreateShopInput,
  FindShopRepositoryInput,
  UpdateShopRepositoryInput,
} from "./types/shop.repository.types.js";

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
   * Create a new shop.
   */
  static async create(
    input: CreateShopInput,
    options: TransactionOptions,
  ): Promise<ShopLean | null> {
    const {
      userId,
      name,
      slug,
      description,
      logo,
      status = SHOP_STATUS.ACTIVE,
    } = input;
    const [createdShop] = await Shops.create(
      [
        {
          user: toObjectId(userId),
          name: name,
          slug: slug ?? undefined,
          logo: logo ?? undefined,
          description,
          status,
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
   * Update a single shop.
   */
  static async update({
    query,
    update,
  }: UpdateShopRepositoryInput): Promise<ShopLean | null> {
    // Find the document first.
    const shop = await Shops.findOne(query);
    if (!shop) return null;

    // Apply the updates to the document.
    Object.assign(shop, update);

    // Save it (triggers the hooks).
    await shop.save();

    return shop.toObject();
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
