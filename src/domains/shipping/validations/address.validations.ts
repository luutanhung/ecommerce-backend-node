import { z } from "zod";

import { ResCode } from "../../../shared/constants/resCode.constants.js";
import { createRequiredStringSchema } from "../../../shared/validations/common.validations.js";

export const ProvinceCodeSchema = z.coerce
  .number()
  .min(1, {
    error: ResCode.ADDRESS_PROVINCE_CODE_MUST_BE_AT_LEAST_1,
  })
  .max(96, {
    error: ResCode.ADDRESS_PROVINCE_CODE_CANNOT_EXCEED_96,
  });

export const GetDistrictsSchema = z.object({
  provinceCode: ProvinceCodeSchema,
});
export type GetDistricts = z.infer<typeof GetDistrictsSchema>;

export const DistrictCodeSchema = z.coerce
  .number()
  .min(1, {
    error: ResCode.ADDRESS_DISTRICT_CODE_MUST_BE_AT_LEAST_1,
  })
  .max(973, {
    error: ResCode.ADDRESS_DISTRICT_CODE_CANNOT_EXCEED_973,
  });

export const GetWardsQuerySchema = z.object({
  districtCode: DistrictCodeSchema,
});
export type GetWardsQuery = z.infer<typeof GetWardsQuerySchema>;

export const ProvinceNameSchema = createRequiredStringSchema({
  requiredMessage: ResCode.ADDRESS_PROVINCE_NAME_REQUIRED,
  invalidMessage: ResCode.ADDRESS_PROVINCE_NAME_INVALID,
});

export const DistrictNameSchema = createRequiredStringSchema({
  requiredMessage: ResCode.ADDRESS_DISTRICT_NAME_REQUIRED,
  invalidMessage: ResCode.ADDRESS_DISTRICT_NAME_INVALID,
});

export const WardNameSchema = createRequiredStringSchema({
  requiredMessage: ResCode.ADDRESS_WARD_NAME_REQUIRED,
  invalidMessage: ResCode.ADDRESS_WARD_NAME_INVALID,
});

export const AddressLineSchema = createRequiredStringSchema({
  requiredMessage: ResCode.ADDRESS_ADDRESS_LINE_REQUIRED,
  invalidMessage: ResCode.ADDRESS_ADDRESS_LINE_INVALID,
}).max(500, {
  error: ResCode.ADDRESS_ADDRESS_LINE_INVALID,
});
