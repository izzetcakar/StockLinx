import { IManufacturer } from "../interfaces/interfaces";
import { checkEmpty } from "./checkEmpty";

export const getManufacturerSelectData = (
  manufacturerArray: IManufacturer[]
) => {
  if (checkEmpty(manufacturerArray)) return [];
  return manufacturerArray.map((manufacturer) => {
    return {
      value: manufacturer.id,
      label: manufacturer.name,
    };
  });
};
