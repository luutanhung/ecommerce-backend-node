import axios from "axios";

import type { Province } from "../types/address.types.js";

type VietnamOpenApiProvince = {
  name: string;
  code: number;
  division_type: string;
  codename: string;
  phone_code: number;
};

type VietnamOpenApiGetProvincesResponse = VietnamOpenApiProvince[];

export class AddressService {
  private static readonly baseUrl = "https://provinces.open-api.vn/api";

  /**
   * Get provinces from Vietnam's new provincial system.
   */
  static async getProvinces(): Promise<Province[]> {
    const { data } = await axios.get<VietnamOpenApiGetProvincesResponse>(
      `${this.baseUrl}/p`,
    );

    return data.map((province: VietnamOpenApiProvince) => {
      return {
        code: province.code,
        name: province.codename,
      };
    });
  }
}
