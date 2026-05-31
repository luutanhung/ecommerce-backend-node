export type CreateObjectIdSchemaInput = {
  requiredMessage: string;
  invalidMessage: string;
};

export type CreatePositiveNumberSchemaInput = {
  invalidMessage: string;
  positiveMessage: string;
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
