import { BaseColumn, Column } from "@interfaces/gridTableInterfaces";
import { useGridTableContext } from "../context/GenericStateContext";
import { useFilter } from "./filter";
import { useCallback } from "react";
import uuid4 from "uuid4";

export const useColumns = (columns: BaseColumn[]) => {
  const { gridColumns, setGridColumns } = useGridTableContext();
  const { setBaseFiltersByColumns } = useFilter();

  const onBaseColumnsChange = useCallback(() => {
    let newColumns: Column[] = [];
    if (gridColumns.length === columns.length) {
      newColumns = gridColumns.map((column, index) => {
        return {
          ...column,
          id: column?.id || uuid4(),
          lookup: columns[index]?.lookup,
          renderComponent: columns[index]?.renderComponent,
        };
      });
    } else {
      newColumns = columns.map((column) => {
        return {
          ...column,
          id: uuid4(),
        };
      });
      setBaseFiltersByColumns(newColumns);
    }
    setGridColumns(newColumns);
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
