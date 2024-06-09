import { Column, LookupData } from "@/interfaces/gridTableInterfaces";
import React from "react";

export const getLookupValue = (value: any, data: LookupData[]) => {
  return data.find((item: LookupData) => item.value === value)?.label || "";
};

export const getCellValue = (obj: object, column: Column) => {
  let value = (
    obj as {
      [key: string | number]: any;
    }
  )[column.dataField];
  if (!value) value = null;
  if (column.lookup) return getLookupValue(value, column.lookup.data);
  return value;
};

interface RenderCellProps {
  obj: object;
  column: Column;
}
export const RenderCell: React.FC<RenderCellProps> = ({ obj, column }) => {
  if (column.renderComponent) {
    return <div> {column.renderComponent(obj)}</div>;
  }

  let value = (
    obj as {
      [key: string | number]: any;
    }
  )[column.dataField];

  if (column.lookup?.data) {
    value = getLookupValue(value, column.lookup.data);
  }
  if (column.dataType === "boolean") {
    return value;
  }
  if (column.dataType === "date") {
    value = new Date(value).toLocaleDateString();
  }
  return value;
};
