import { BaseColumn } from "@interfaces/gridTableInterfaces";
import { useGridTableContext } from "../context/GenericStateContext";
import { useFilter } from "./filter";
import { useCallback } from "react";
import uuid4 from "uuid4";

export const useColumns = (columns: BaseColumn[]) => {
  const { gridColumns, setGridColumns } = useGridTableContext();
  const { setBaseFiltersByColumns } = useFilter();

  const onBaseColumnsChange = useCallback(() => {
    if (gridColumns.length === columns.length) return;
    const newColumns = columns.map((column) => {
      return {
        ...column,
        id: uuid4(),
      };
    });
    setGridColumns(newColumns);
    setBaseFiltersByColumns(newColumns);
  }, [columns]);

  const onColumnVisibleChange = (columnId: string) => {
    const newColumns = gridColumns.map((column) => {
      if (column.id === columnId) {
        return {
          ...column,
          isVisible: !column.visible,
        };
      }
      return column;
    });
    setGridColumns(newColumns);
  };

  return {
    onColumnVisibleChange,
    onBaseColumnsChange,
  };
};
