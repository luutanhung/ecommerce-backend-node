export type Province = {
  name: string;
  code: number;
};

export type Ward = {
  name: string;
  code: number;
};

export type Address = {
  province: string;
  ward: string;
  addressLine: string;
};
