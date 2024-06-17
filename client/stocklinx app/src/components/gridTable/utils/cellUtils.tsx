import { LookupData, RenderCellProps } from "@/interfaces/gridTableInterfaces";
import React from "react";

export const GetLookupValue = (value: any, data?: LookupData[]) => {
  return data?.find((item: LookupData) => item.value === value)?.label || "";
};

export const RenderCell: React.FC<RenderCellProps> = ({ obj, column }) => {
  if (column.renderComponent) {
    return column.renderComponent(obj);
  }

  const value = (
    obj as {
      [key: string | number]: any;
    }
  )[column.dataField];

  if (column.lookup?.data) {
    return GetLookupValue(value, column.lookup.data);
  }
  if (column.dataType === "boolean") {
    return value;
  }
  if (column.dataType === "date") {
    return new Date(value).toLocaleDateString();
  }
  return value;
};
