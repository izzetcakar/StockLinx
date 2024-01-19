import { useEffect } from "react";
import { Column } from "../interfaces/interfaces";
import { useGridTableContext } from "../context/GenericStateContext";

export const useVisibleColumns = (columns: Column[]) => {
  const { setVisibleColumns } = useGridTableContext();

  const addVisibleColumn = (columnCaption: string): void => {
    setVisibleColumns((prev) =>
      prev.map((x) => x.caption).includes(columnCaption)
        ? prev.filter((item) => item.caption !== columnCaption)
        : [...prev, columns.find((x) => x.caption === columnCaption)!]
    );
  };

  const handleVisibleColumns = () => {
    setVisibleColumns(
      columns
        .filter((c) => c.visible !== false)
        .map((item) => {
          return {
            caption: item.caption,
            dataField: item.dataField,
            renderHeader: item.renderHeader,
          };
        })
    );
  };

  useEffect(() => {
    handleVisibleColumns();
  }, [columns]);

  return {
    addVisibleColumn,
    handleVisibleColumns,
  };
};
