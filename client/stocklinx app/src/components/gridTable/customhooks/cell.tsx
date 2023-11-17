import { Column, Lookup } from "../interfaces/interfaces";

export const useCell = () => {
  const getLookupValue = (value: any, lookup: Lookup) => {
    const lookupKey = lookup.valueExpr;
    const lookupDisplay = lookup.displayExpr;
    const item = lookup.dataSource.find(
      (item: { [key: string]: any }) => item[lookupKey] === value
    );

    return item
      ? ((item as { [key: string]: any })[lookupDisplay] as string)
      : " ";
  };
  const renderColumnValue = (obj: object, column: Column) => {
    const value = (
      obj as {
        [key: string | number]: string | number | boolean | null;
      }
    )[column.dataField];

    if (column.renderComponent) {
      return column.renderComponent(value);
    }
    if (column.lookup) {
      return getLookupValue(value, column.lookup);
    }
    if (value === null || value === undefined) {
      return "";
    }
    if (typeof value === "boolean") {
      const name = value ? "check" : "x";
      const color = value ? "#63bd4f" : "#ed6b6b";
      return (
        <i
          className={`bx bx-${name}`}
          style={{ fontSize: "1.5rem", color: color }}
        />
      );
    }
    return value;
  };
  return { getLookupValue, renderColumnValue };
};
