import { Product, type ProductProps } from "./baseProduct.entity.js";

export type FurnitureAttributes = {
  brand: string;
  size?: string;
  material?: string;
};

export class Furniture extends Product<FurnitureAttributes> {
  constructor(payload: ProductProps<FurnitureAttributes>) {
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

// export class Furniture extends Product<FurnitureAttributes> {
//   constructor(payload: CreateProductInput<FurnitureAttributes>) {
//     super(payload);
//   }

//   override async createProduct(): Promise<ProductDocument> {
//     const newFurniture = await Furnitures.create({
//       ...this.payload.productAttributes,
//       productShop: this.payload.productShop,
//     });

//     if (!newFurniture) {
//       throw new BadRequestAppError({
//         code: ResCode.PRODUCT_CLOTHING_CREATION_FAILURE,
//       });
//     }

//     return await super.createBaseProduct(newFurniture._id);
//   }
// }
