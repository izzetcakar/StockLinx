import { BaseEntity } from "../interfaces/interfaces";

export const getNameFromArray = (array: BaseEntity[], id: string): string => {
  const item = array.find((item) => item.id === id);
  if (item) {
    return item?.name;
  }
  return "";
};
