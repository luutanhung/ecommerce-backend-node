import { ProductType } from "../domains/product/constants/product.constants.js";
import { ProductFactory } from "../domains/product/product.factory.js";
import { ClothingCreationStrategy } from "../domains/product/strategies/clothing.strategy.js";
import { ElectronicCreationStrategy } from "../domains/product/strategies/electronic.strategy.js";
import { FurnitureCreationStrategy } from "../domains/product/strategies/furniture.strategy.js";

/**
 * Register product strategies.
 */
export const registerProductStrategies = (): void => {
  ProductFactory.register(ProductType.CLOTHING, new ClothingCreationStrategy());

  ProductFactory.register(
    ProductType.ELECTRONICS,
    new ElectronicCreationStrategy(),
  );

  ProductFactory.register(
    ProductType.FURNITURE,
    new FurnitureCreationStrategy(),
  );
};
