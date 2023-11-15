import { useCallback, useState } from "react";
import { Column, VisibleColumn } from "../interfaces/interfaces";

export const useVisibleColumns = (columns: Column[]) => {
  const [visibleColumns, setVisibleColumns] = useState<VisibleColumn[]>([]);

  const addVisibleColumn = (columnCaption: string): void => {
    setVisibleColumns((prev) =>
      prev.map((x) => x.caption).includes(columnCaption)
        ? prev.filter((item) => item.caption !== columnCaption)
        : [...prev, columns.find((x) => x.caption === columnCaption)!]
    );
  };
  const handleVisibleColumns = useCallback(() => {
    setVisibleColumns(
      columns.map((item) => {
        return {
          caption: item.caption,
          dataField: item.dataField,
          renderHeader: item.renderHeader,
        };
      })
    );
  }, [columns]);

  return {
    addVisibleColumn,
    visibleColumns,
    handleVisibleColumns,
  };
};
