import { getNameFromArray } from "../../functions/getNameFromArray";
import { BaseEntity } from "../../interfaces/interfaces";

export interface IValue {
  value: string | number | boolean | null;
}

export const NameComponent: (
  value: string | number | boolean | null | undefined,
  data: BaseEntity[]
) => JSX.Element = (value, data) => {
  const name = getNameFromArray(data, value as string);
  return <div>{name}</div>;
};
