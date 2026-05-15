import _ from "lodash";

export const getInfoData = <
  T extends Record<string, unknown>,
  K extends keyof T,
>(
  fields: K[],
  obj: T,
): Pick<T, K> => {
  return _.pick(obj, fields) as Pick<T, K>;
};
