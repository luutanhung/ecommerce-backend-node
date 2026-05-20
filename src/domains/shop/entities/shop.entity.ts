import slugify from "slugify";

import type { ShopStatus } from "../types/shop.type.js";

import { SHOP_STATUS } from "../shop.constants.js";

export type ShopProps = {
  id?: string;
  shopOwner: string;
  shopName: string;
  shopSlug: string;
  shopLogo?: string;
  shopStatus?: ShopStatus;
  isVerified: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};

export class Shop {
  constructor(private props: ShopProps) {}

  public construtor(props: ShopProps) {
    this.props = {
      ...props,
      shopSlug:
        props.shopSlug ||
        slugify(props.shopName, {
          lower: true,
        }),
    };
  }

  slugify(): void {
    this.props.shopSlug = slugify(this.props.shopName, {
      lower: true,
    });
  }

  activate(): void {
    this.props.shopStatus = SHOP_STATUS.ACTIVE;
  }

  deactivate(): void {
    this.props.shopStatus = SHOP_STATUS.INACTIVE;
  }

  verify() {
    this.props.isVerified = true;
  }

  rename(shopName: string) {
    this.props.shopName = shopName;
    this.slugify();
  }

  get id() {
    return this.props.id;
  }

  get shopName() {
    return this.props.shopName;
  }

  get shopSlug() {
    return this.props.shopSlug;
  }

  toPersistence() {
    return {
      shopOwner: this.props.shopOwner,

      shopName: this.props.shopName,

      shopSlug: this.props.shopSlug,

      shopLogo: this.props.shopLogo,

      shopStatus: this.props.shopStatus,

      isVerified: this.props.isVerified,
    };
  }

  toJSON() {
    return {
      id: this.props.id,

      ...this.props,
    };
  }

  static create(
    props: Omit<ShopProps, "shopSlug" | "shopStatus" | "isVerified">,
  ) {
    return new Shop({
      ...props,

      shopStatus: SHOP_STATUS.INACTIVE,

      isVerified: false,

      shopSlug: slugify(props.shopName, {
        lower: true,
      }),
    });
  }

  static restore(props: ShopProps) {
    return new Shop(props);
  }
}
