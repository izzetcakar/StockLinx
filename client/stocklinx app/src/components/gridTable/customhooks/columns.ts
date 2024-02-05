import { BaseColumn } from "../interfaces/interfaces";
import { useGridTableContext } from "../context/GenericStateContext";
import uuid4 from "uuid4";
import { useFilter } from "./filter";

export const useColumns = (columns: BaseColumn[]) => {
  const { gridColumns, setGridColumns } = useGridTableContext();
  const { handleFilterAll } = useFilter();

  const handleBaseColumnsChange = () => {
    const newColumns = columns.map((column) => {
      return {
        ...column,
        id: uuid4(),
      };
    });
    setGridColumns(newColumns);
    handleFilterAll(newColumns);
  };

  const onVisibleColumnsChange = (columnId: string) => {
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
    onVisibleColumnsChange,
    handleBaseColumnsChange,
  };
};
