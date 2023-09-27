import { getNameFromArray } from "../../functions/getNameFromArray";
import { BaseEntity } from "../../interfaces/interfaces";

export interface IValue {
  value: string | number | boolean | null;
}

export const NameComponent: (
  value: string,
  data: BaseEntity[]
) => JSX.Element = (value, data) => {
  const name = getNameFromArray(data, value?.toString());
  return <div>{name}</div>;
};
