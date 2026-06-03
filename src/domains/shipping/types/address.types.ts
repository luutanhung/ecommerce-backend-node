export type Province = {
  code: number;
  name: string;
};

export type District = {
  code: number;
  name: string;
};

export type Ward = {
  code: number;
  name: string;
};

export type Address = {
  province: string;
  district: string;
  ward: string;
  addressLine: string;
};
