export type CreateObjectIdSchemaInput = {
  requiredMessage: string;
  invalidMessage: string;
};

export type CreatePositiveNumberSchemaInput = {
  invalidTypeMessage: string;
  positiveMessage: string;
};

export type CreateRequiredStringSchemaInput = {
  requiredMessage: string;
  invalidTypeMessage: string;
  trim?: boolean;
};
