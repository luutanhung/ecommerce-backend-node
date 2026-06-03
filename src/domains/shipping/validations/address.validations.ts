import { z } from "zod";

import { ResCode } from "../../../shared/constants/resCode.constants.js";

export const ProvinceCodeSchema = z.coerce
  .number()
  .min(1, {
    error: ResCode.ADDRESS_PROVINCE_CODE_MUST_BE_AT_LEAST_1,
  })
  .max(96, {
    error: ResCode.ADDRESS_PROVINCE_CODE_CANNOT_EXCEED_96,
  });

export const GetWardsQuerySchema = z.object({
  provinceCode: ProvinceCodeSchema,
});
export type GetWardsQuery = z.infer<typeof GetWardsQuerySchema>;
