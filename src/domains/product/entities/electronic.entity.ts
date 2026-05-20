import { Product, type ProductProps } from "./baseProduct.entity.js";

export type ElectronicAttributes = {
  manufacturer: string;
  model?: string;
  color?: string;
};

export class Electronic extends Product<ElectronicAttributes> {
  constructor(payload: ProductProps<ElectronicAttributes>) {
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

// export class Electronic extends Product<ElectronicAttributes> {
//   constructor(payload: CreateProductInput<ElectronicAttributes>) {
//     super(payload);
//   }

//   override async createProduct(): Promise<ProductDocument> {
//     const newElectronic = await Electronics.create({
//       ...this.payload.productAttributes,
//       productShop: this.payload.productShop,
//     });

//     if (!newElectronic) {
//       throw new BadRequestAppError({
//         code: ResCode.PRODUCT_ELECTRONIC_CREATION_FAILURE,
//       });
//     }

//     return await super.createBaseProduct(newElectronic._id);
//   }
// }
