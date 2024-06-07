import { Column } from "@/interfaces/gridTableInterfaces";
import { useGridTableContext } from "../context/GenericStateContext";

export const useVisible = () => {
  const { visibleColumns, gridColumns, setVisibleColumns } =
    useGridTableContext();

  const onVisibleChange = (columnId: string) => {
    const column = gridColumns.find((c) => c.id === columnId);
    if (!column) return;
    if (column.allowVisible === false) return;
    const isVisible = visibleColumns.find((c) => c.id === columnId);
    const newVisibleColumns = isVisible
      ? visibleColumns.filter((column) => column.id !== columnId)
      : [...visibleColumns, column];
    setVisibleColumns(newVisibleColumns);
  };

  const setBaseVisibleColumns = (columns: Column[]) => {
    setVisibleColumns(
      columns.filter((column) => column.allowVisible !== false)
    );
  };

  const checkIsVisible = (columnId: string) => {
    return !!visibleColumns.find((c) => c.id === columnId);
  };

  return {
    onVisibleChange,
    setBaseVisibleColumns,
    checkIsVisible,
  };
};
