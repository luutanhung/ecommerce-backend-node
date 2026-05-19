import { ProductType } from "../domains/product/product.constants.js";
import { ProductFactory } from "../domains/product/product.factory.js";
import { ClothingStrategy } from "../domains/product/strategies/clothing.strategy.js";
import { ElectronicStrategy } from "../domains/product/strategies/electronic.strategy.js";
import { FurnitureStrategy } from "../domains/product/strategies/furniture.strategy.js";

/**
 * Register product strategies.
 */
export const registerProductStrategies = (): void => {
  ProductFactory.register(ProductType.CLOTHING, new ClothingStrategy());

  ProductFactory.register(ProductType.ELECTRONICS, new ElectronicStrategy());

  ProductFactory.register(ProductType.FURNITURE, new FurnitureStrategy());
};
