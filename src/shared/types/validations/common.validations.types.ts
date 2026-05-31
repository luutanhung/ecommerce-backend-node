export type CreateObjectIdSchemaInput = {
  requiredMessage: string;
  invalidMessage: string;
};

export type CreatePositiveNumberSchemaInput = {
  invalidMessage: string;
  positiveMessage: string;
};

export type CreatePositiveIntegerSchemeInput = {
  invalidMessage: string;
  minValueMessage: string;
  minValue?: number;
};

export type CreateRequiredStringSchemaInput = {
  requiredMessage: string;
  invalidMessage: string;
  trim?: boolean;
};

export type CreateJwtTokenSchemaInput = {
  requiredMessage: string;
  invalidMessage: string;
};
