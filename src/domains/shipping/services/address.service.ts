import axios from "axios";

import type { Province, Ward } from "../types/address.types.js";
import type { GetWardsInput } from "./types/address.service.types.js";

import { BadRequestAppError } from "../../../core/error/badRequestAppError.js";
import { InternalSystemError } from "../../../core/error/internalSystemError.js";
import { logger } from "../../../libs/logger.js";
import { ResCode } from "../../../shared/constants/resCode.constants.js";
import { CacheService } from "../../../shared/services/cache.service.js";

type VietnamOpenApiProvince = {
  name: string;
  code: number;
  division_type: string;
  codename: string;
  phone_code: number;
  wards: VietnamOpenApiWard[];
};

type VietnamOpenApiWard = {
  name: string;
  code: number;
  codename: string;
  short_codename: string;
};

type VietnamOpenApiGetProvincesResponse = VietnamOpenApiProvince[];

export class AddressService {
  private static readonly VIETNAME_OPEN_API_BASE_URL =
    "https://provinces.open-api.vn/api/v2";
  private static readonly PROVINCE_CACHE_KEY =
    "address:vietname-open-api:provinces";
  private static readonly PROVINCE_CACHE_TTL = 60 * 60 * 24; // 24 hours.

  static handleFetchProvincesError() {}

  private static async fetchProvinces(): Promise<VietnamOpenApiProvince[]> {
    return CacheService.remember(
      this.PROVINCE_CACHE_KEY,
      this.PROVINCE_CACHE_TTL,
      async () => {
        try {
          const { data } = await axios.get<VietnamOpenApiGetProvincesResponse>(
            `${this.VIETNAME_OPEN_API_BASE_URL}/?depth=2`,
          );

          return data;
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
          logger.error(
            { err },
            "Failed to fetch provinces from Vietnam Open API",
          );

          throw new InternalSystemError({
            code: ResCode.ADDRESS_GET_PROVINCES_FAILED,
          });
        }
      },
    );
  }

  /**
   * Get provinces from Vietnam's new provincial system.
   */
  static async getProvinces(): Promise<Province[]> {
    const vietnamOpenApiProvinces = await this.fetchProvinces();

    return vietnamOpenApiProvinces.map((province: VietnamOpenApiProvince) => {
      return {
        code: province.code,
        name: province.name,
      };
    });
  }

  static async getWards({ provinceCode }: GetWardsInput): Promise<Ward[]> {
    const vietnamOpenApiProvinces = await this.fetchProvinces();

    const foundVietnamOpenApiProvince = vietnamOpenApiProvinces.find(
      (province) => province.code === provinceCode,
    );

    if (!foundVietnamOpenApiProvince) {
      throw new BadRequestAppError({
        code: ResCode.ADDRESS_PROVINCE_NOT_FOUND,
      });
    }

    return foundVietnamOpenApiProvince.wards.map((ward: VietnamOpenApiWard) => {
      return {
        code: ward.code,
        name: ward.name,
      };
    });
  }
}
