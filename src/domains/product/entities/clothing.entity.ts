import { Product, type ProductProps } from "./baseProduct.entity.js";

export type ClothingAttributes = {
  brand: string;
  size?: string;
  material?: string;
};

export class Clothing extends Product<ClothingAttributes> {
  constructor(payload: ProductProps<ClothingAttributes>) {
    super(payload);
  }

  toPersistence() {
    return {
      ...this.props,
    };
  }

  toAttributesPersistence() {
    return {
      ...this.props.productAttributes,

      productShop: this.props.productShop,
    };
  }
}
