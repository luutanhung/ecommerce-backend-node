import type { AxiosInstance } from "axios";
import axios from "axios";

import type { CalculateShippingFeeInput } from "../types/shipping.provider.types.js";

import { config } from "../../../../configs/config.js";
import { BadRequestAppError } from "../../../../core/error/badRequestAppError.js";
import { InternalSystemError } from "../../../../core/error/internalSystemError.js";
import { logger } from "../../../../libs/logger.js";
import { ResCode } from "../../../../shared/constants/resCode.constants.js";
import { ShippingProvider } from "../shipping.provider.js";

type GHNBaseResponse<T = unknown> = {
  code: number;
  message: string;
  data: T;
};

export type GHNProvince = {
  ProvinceID: number;
  ProvinceName: string;
  NameExtension: string[];
};

export type GHNDistrict = {
  DistrictID: number;
  DistrictName: string;
};

export type GHNWard = {
  WardCode: string;
  WardName: string;
};

export class GHNProvider extends ShippingProvider {
  private baseUrl: string;
  private axiosInstance: AxiosInstance;

  constructor() {
    super();

    this.baseUrl = config.shipping.ghn.baseApiUrl;

    this.axiosInstance = axios.create({
      baseURL: this.baseUrl,
      timeout: 5000,
      headers: {
        Accept: "application/json",
        Token: config.shipping.ghn.token,
      },
    });
  }

  async fetchProvinces(): Promise<GHNProvince[]> {
    try {
      const res = await this.axiosInstance.get<GHNBaseResponse<GHNProvince[]>>(
        `${this.baseUrl}/master-data/province`,
      );

      return res.data.data;
    } catch (err) {
      logger.error({ err }, "Failed to fetch provinces from GHN");

      throw new InternalSystemError({
        code: ResCode.SHIPPING_GHN_FETCH_PROVINCES_FAILED,
      });
    }
  }

  async fetchDistricts(ProvinceID: number): Promise<GHNDistrict[]> {
    try {
      const res = await this.axiosInstance.get<GHNBaseResponse<GHNDistrict[]>>(
        `${this.baseUrl}/master-api/district?province_id=${ProvinceID}`,
      );

      return res.data.data;
    } catch (err) {
      logger.error({ err }, "Failed to fetch districts from GHN");

      throw new InternalSystemError({
        code: ResCode.SHIPPING_GHN_FETCH_DISTRICTS_FAILED,
      });
    }
  }

  async fetchWards(DistrictID: number): Promise<GHNWard[]> {
    try {
      const res = await this.axiosInstance.get<GHNBaseResponse<GHNWard[]>>(
        `${this.baseUrl}/master-api/ward?district_id=${DistrictID}`,
      );

      return res.data.data;
    } catch (err) {
      logger.error({ err }, "Failed to fetch wards from GHN");

      throw new InternalSystemError({
        code: ResCode.SHIPPING_GHN_FETCH_WARDS_FAILED,
      });
    }
  }

  async calculateShippingFee({
     
    originInfo,
     
    destinationInfo,
    // eslint-disable-next-line
    weight,
  }: CalculateShippingFeeInput): Promise<void> {
    const provinces: GHNProvince[] = await this.fetchProvinces();

    const foundOriginProvince = provinces.find(
      (province) => province.ProvinceName === originInfo.province,
    );

    const foundDestinationProvince = provinces.find(
      (province) => province.ProvinceName === originInfo.province,
    );

    if (!foundOriginProvince) {
      throw new BadRequestAppError({
        code: ResCode.SHIPPING_GHN_ORIGIN_PROVINCE_NOT_FOUND,
      });
    }

    if (!foundDestinationProvince) {
      throw new BadRequestAppError({
        code: ResCode.SHIPPING_GHN_DESTINATION_PROVINCE_NOT_FOUND,
      });
    }

    const originDistricts: GHNDistrict[] = await this.fetchDistricts(
      foundOriginProvince.ProvinceID,
    );

    const foundOriginDistrict = originDistricts.find(
      (district) =>
        district.DistrictName.toLowerCase() ===
        originInfo.district.toLowerCase(),
    );

    if (!foundOriginDistrict) {
      throw new BadRequestAppError({
        code: ResCode.SHIPPING_GHN_ORIGIN_DISTRICT_NOT_FOUND,
      });
    }

    const destinationDistricts: GHNDistrict[] = await this.fetchDistricts(
      foundDestinationProvince.ProvinceID,
    );

    const foundDestinationDistrict = destinationDistricts.find((district) => {
      return (
        district.DistrictName.toLowerCase() ===
        destinationInfo.district.toLowerCase()
      );
    });

    if (!foundDestinationDistrict) {
      throw new BadRequestAppError({
        code: ResCode.SHIPPING_GHN_DESTINATION_DISTRICT_NOT_FOUND,
      });
    }

    const originWards = await this.fetchWards(foundOriginDistrict.DistrictID);

    const foundOriginWard = originWards.find((ward: GHNWard) => {
      return (
        ward.WardName.toLocaleLowerCase() === originInfo.ward.toLowerCase()
      );
    });

    if (!foundOriginWard) {
      throw new BadRequestAppError({
        code: ResCode.SHIPPING_GHN_ORIGIN_WARD_NOT_FOUND,
      });
    }

    const destinationWards = await this.fetchWards(
      foundDestinationDistrict.DistrictID,
    );

    const foundDestinationWard = destinationWards.find((ward: GHNWard) => {
      return (
        ward.WardName.toLocaleLowerCase() === destinationInfo.ward.toLowerCase()
      );
    });

    if (!foundDestinationWard) {
      throw new BadRequestAppError({
        code: ResCode.SHIPPING_GHN_DESTINATION_WARD_NOT_FOUND,
      });
    }
  }
}
