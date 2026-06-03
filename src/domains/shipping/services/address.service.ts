import axios from "axios";

import type { Province, Ward } from "../types/address.types.js";
import type {
  GetDistrictsInput,
  GetWardsInput,
} from "./types/address.service.types.js";

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
};

type VietnamepenApiDistrict = {
  name: string;
  code: number;
  disvision_type: string;
  codename: string;
  province_code: number;
};

type VietnamOpenApiWard = {
  name: string;
  code: number;
  codename: string;
  short_codename: string;
};

type VietnamOpenApiGetProvincesResponse = VietnamOpenApiProvince[];

type VietnamOpenApiGetDistrictsResponse = VietnamOpenApiProvince & {
  districts: VietnamepenApiDistrict[];
};

type VietnameOpenApiGetWardsResponse = VietnamepenApiDistrict & {
  wards: VietnamOpenApiWard[];
};

export class AddressService {
  private static readonly VIETNAM_OPEN_API_V1_BASE_URL =
    "https://provinces.open-api.vn/api/v1";
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
            `${this.VIETNAM_OPEN_API_V1_BASE_URL}/p?depth=2`,
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

  static async getDistricts({ provinceCode }: GetDistrictsInput) {
    try {
      const { data } = await axios.get<VietnamOpenApiGetDistrictsResponse>(
        `${this.VIETNAM_OPEN_API_V1_BASE_URL}/p/${provinceCode}?depth=2`,
      );

      return data.districts.map((district: VietnamepenApiDistrict) => {
        return {
          code: district.code,
          name: district.name,
        };
      });
      // eslint-disable-next-line
    } catch (err: any) {}
  }

  static async getWards({ districtCode }: GetWardsInput): Promise<Ward[]> {
    try {
      const { data } = await axios.get<VietnameOpenApiGetWardsResponse>(
        `${this.VIETNAM_OPEN_API_V1_BASE_URL}/d/${districtCode}?depth=2`,
      );

      return data.wards.map((ward: VietnamOpenApiWard) => {
        return {
          code: ward.code,
          name: ward.name,
        };
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      logger.error({ err }, "Failed to fetch district from Vietnam Open API");

      throw new InternalSystemError({
        code: ResCode.ADDRESS_GET_WARDS_FAILED,
      });
    }
  }
}
