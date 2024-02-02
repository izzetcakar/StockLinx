import { BaseColumn } from "../interfaces/interfaces";
import { useGridTableContext } from "../context/GenericStateContext";
import uuid4 from "uuid4";

export const useColumns = (columns: BaseColumn[]) => {
  const { gridColumns, setGridColumns } = useGridTableContext();

  const handleBaseColumnsChange = () => {
    const newColumns = columns.map((column) => {
      return {
        ...column,
        id: uuid4(),
      };
    });
    setGridColumns(newColumns);
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
