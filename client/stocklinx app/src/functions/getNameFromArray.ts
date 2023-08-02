import { IdentifiableItem } from "../interfaces/interfaces";

export const getNameFromArray = <T extends IdentifiableItem>(
  array: T[],
  id: string
): string => {
  const item = array.find((item) => item?.id === id);
  return item?.name || "";
};
