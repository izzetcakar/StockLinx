import { DataColumn, Column } from "@interfaces/gridTableInterfaces";
import { UseGridTableContext } from "../context/GenericStateContext";
import { filterHooks } from "./filter";
import { useVisible } from "./visible";
import uuid4 from "uuid4";

export const useColumns = (columns: DataColumn[]) => {
  const { setGridColumns } = UseGridTableContext();
  const { setBaseFiltersByColumns } = filterHooks.useFilter();
  const { setBaseVisibleColumns } = useVisible();

  const onDataColumnsChange = () => {
    const newColumns: Column[] = columns.map((column) => {
      return {
        ...column,
        id: uuid4(),
        lookup: column.lookup,
        renderComponent: column.renderComponent,
      };
    });

    setBaseFiltersByColumns(newColumns);
    setBaseVisibleColumns(newColumns);
    setGridColumns(newColumns);
  };

  return {
    onDataColumnsChange,
  };
};
