import { Column, LookupData } from "@/interfaces/gridTableInterfaces";

export const getLookupValue = (value: any, data: LookupData[]) => {
  return data.find((item: LookupData) => item.value === value)?.label || "";
};

export const renderCell = (obj: object, column: Column) => {
  if (column.renderComponent) {
    return column.renderComponent(obj);
  }
  const value = (
    obj as {
      [key: string | number]: any;
    }
  )[column.dataField];

  if (value === undefined || value === null) {
    return "";
  }

  if (column.lookup?.data) {
    return getLookupValue(value, column.lookup.data);
  }
  if (column.dataType === "boolean") {
    return value;
  }
  if (column.dataType === "date") {
    return new Date(value).toLocaleDateString();
  }
  return value;
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
