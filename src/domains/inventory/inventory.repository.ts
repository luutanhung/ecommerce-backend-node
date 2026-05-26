import type { InventoryLean } from "./types/inventory.model.types.js";
import type { CreateInventoryRepositoryInput } from "./types/inventory.repository.types.js";

import type { TransactionOptions } from "../../shared/types/mongoose.type.js";
import { toObjectId } from "../../shared/utils/mongoose.utils.js";

import { Inventories } from "./inventory.model.js";

export class InventoryRepository {
  static async createInventory(
    {
      productId,
      shopId,
      stock,
      location = "",
      reservations = [],
    }: CreateInventoryRepositoryInput,
    options: TransactionOptions = {},
  ): Promise<InventoryLean | null> {
    const [createdInventory] = await Inventories.create(
      [
        {
          inventoryProduct: toObjectId(productId),
          inventoryShop: toObjectId(shopId),
          inventoryStock: stock,
          inventoryLocation: location,
          inventoryReservations: reservations,
        },
      ],
      {
        session: options.session,
      },
    );

    if (!createdInventory) {
      return null;
    }

    return createdInventory.toObject();
  }
}
