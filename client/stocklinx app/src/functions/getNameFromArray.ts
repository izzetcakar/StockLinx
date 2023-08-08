import { BaseEntity, IdentifiableItem } from "../interfaces/interfaces";

export const getNameFromArray = <T extends BaseEntity>(
  array: T[],
  id: string
): string => {
  const item = array.find((item) => item?.id === id);
  return item?.name || "";
};
