import { Column, LookupData } from "../interfaces/interfaces";

export const useCell = () => {
  const getLookupValue = (value: any, data: LookupData[]) => {
    return data.find((item: LookupData) => item.value === value)?.label || "";
  };

  const renderCell = (obj: object, column: Column) => {
    const value = (
      obj as {
        [key: string | number]: any;
      }
    )[column.dataField];

    if (value === undefined || value === null) {
      return "";
    }

    if (column.renderComponent) {
      return column.renderComponent(obj);
    }
    if (column.lookup) {
      return getLookupValue(value, column.lookup.data);
    }
    if (!value) return "";
    if (column.dataType === "boolean") {
      const name = value ? "check" : "x";
      const color = value ? "#63bd4f" : "#ed6b6b";
      return (
        <i
          className={`bx bx-${name}`}
          style={{ fontSize: "1.5rem", color: color }}
        />
      );
    }
    if (column.dataType === "date") {
      return new Date(value).toLocaleDateString();
    }
    return value;
  };

  const getCellValue = (obj: object, column: Column) => {
    let value = (
      obj as {
        [key: string | number]: any;
      }
    )[column.dataField];
    if (!value) value = null;
    if (column.lookup) return getLookupValue(value, column.lookup.data);
    return value;
  };

  return { getLookupValue, renderCell, getCellValue };
};
