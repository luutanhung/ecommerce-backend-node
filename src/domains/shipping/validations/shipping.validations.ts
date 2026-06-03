import { z } from "zod";

import { ProductShippingWeightSchema } from "../../product/validations/product.validations.js";
import { SHIPPING_PROVIDER } from "../shipping.constants.js";

import {
  DistrictNameSchema,
  ProvinceNameSchema,
  WardNameSchema,
} from "./address.validations.js";

export const ShippingProviderNameSchema = z.enum(
  Object.values(SHIPPING_PROVIDER),
);

export const ShippingAddress = z.object({
  providerName: ShippingProviderNameSchema,
  province: ProvinceNameSchema,
  district: DistrictNameSchema,
  ward: WardNameSchema,
});

export const CalculateShippingFeeBodySchema = z.object({
  providerName: ShippingProviderNameSchema,
  origin: ShippingAddress,
  destination: ShippingAddress,
  weight: ProductShippingWeightSchema,
});
export type CalculateShippingFeeBody = z.infer<
  typeof CalculateShippingFeeBodySchema
>;
