import { Schema, model } from "mongoose";

import {
  CollectionName,
  DocumentName,
} from "../../constants/model.constants.js";

/**
 * Inventory model.
 */
export const InventorySchema = new Schema(
  {
    inventoryProduct: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: DocumentName.PRODUCT,
    },
    inventoryShop: {
      type: Schema.Types.ObjectId,
      ref: DocumentName.SHOP,
      required: true,
    },
    inventoryLocation: {
      type: String,
      default: "",
    },
    inventoryStock: {
      type: Number,
      required: true,
    },
    inventoryReservations: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
    collection: CollectionName.INVENTORIES,
  },
);

export const Inventories = model(DocumentName.INVENTORY, InventorySchema);
