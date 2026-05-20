import type { ProductType } from "../types/product.type.js";

export type BaseProductAttributes = Record<string, unknown>;

export type ProductProps<TAttributes = BaseProductAttributes> = {
  productOwner: string;

  productShop: string;

  productName: string;

  productThumb: string;

  productDescription?: string;

  productPrice: number;

  productType: ProductType;

  productAttributes: TAttributes;

  isDraft: boolean;

  isPublished: boolean;
};

export abstract class Product<TAttributes = BaseProductAttributes> {
  protected props: ProductProps<TAttributes>;

  protected constructor(props: ProductProps<TAttributes>) {
    this.props = props;
  }

  getPayload() {
    return this.props;
  }

  publish() {
    this.props.isPublished = true;

    this.props.isDraft = false;
  }

  unpublish() {
    this.props.isPublished = false;

    this.props.isDraft = true;
  }

  get productShop() {
    return this.props.productShop;
  }
}

// export abstract class Product<TAttributes> {
//   protected readonly payload: CreateProductInput<TAttributes>;

//   constructor(payload: CreateProductInput<TAttributes>) {
//     this.payload = payload;
//   }

//   protected async createBaseProduct(
//     attributesId: Types.ObjectId,
//   ): Promise<ProductDocument> {
//     return await Products.create({
//       ...this.payload,
//       _id: attributesId,
//     });
//   }

//   abstract createProduct(): Promise<ProductDocument>;
// }
