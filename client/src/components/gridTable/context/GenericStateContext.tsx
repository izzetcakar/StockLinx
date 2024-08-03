import React, { useContext, useState } from "react";
import { createContext } from "react";
import { Column, Filter } from "@interfaces/gridTableInterfaces";

interface GridTableContextProps {
  visibleColumns: Column[];
  filters: Filter[];
  gridColumns: Column[];
  itemPerPage: number;
  selectedKeys: string[];
  loading: boolean;
  setSelectedKeys: React.Dispatch<React.SetStateAction<string[]>>;
  setFilters: React.Dispatch<React.SetStateAction<Filter[]>>;
  setItemPerPage: React.Dispatch<React.SetStateAction<number>>;
  setGridColumns: React.Dispatch<React.SetStateAction<Column[]>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setVisibleColumns: React.Dispatch<React.SetStateAction<Column[]>>;
  clearFilters: () => void;
  clearRowSelection: () => void;
  clearColumnVisibility: () => void;
  clearAll: () => void;
}

const GridTableContext = createContext<GridTableContextProps>({
  visibleColumns: [],
  filters: [],
  itemPerPage: 10,
  gridColumns: [],
  selectedKeys: [],
  loading: false,
  setSelectedKeys: () => {},
  setFilters: () => {},
  setItemPerPage: () => {},
  setGridColumns: () => {},
  setLoading: () => {},
  setVisibleColumns: () => {},
  clearFilters: () => {},
  clearRowSelection: () => {},
  clearColumnVisibility: () => {},
  clearAll: () => {},
});
export const GenericStateProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  //Filters
  const [filters, setFilters] = useState<Filter[]>([]);
  //Pagination
  const [itemPerPage, setItemPerPage] = useState<number>(24);
  //Row Selection
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  //Column Visibility
  const [gridColumns, setGridColumns] = useState<Column[]>([]);
  //Generic
  const [loading, setLoading] = useState<boolean>(false);
  const [visibleColumns, setVisibleColumns] = useState<Column[]>(
    gridColumns.filter((column) => column.allowVisible !== false)
  );

  const clearFilters = () => {
    setFilters((prev) => {
      return prev.map((item) => {
        return { ...item, value: null };
      });
    });
  };

  const clearRowSelection = () => {
    if (selectedKeys.length > 0) setSelectedKeys([]);
  };

  const clearColumnVisibility = () => {
    if (gridColumns.length > 0) setGridColumns([]);
  };

  const clearAll = () => {
    clearFilters();
    clearRowSelection();
    clearColumnVisibility();
  };

  const values = {
    visibleColumns,
    filters,
    itemPerPage,
    selectedKeys,
    gridColumns,
    loading,
    setFilters,
    setItemPerPage,
    setSelectedKeys,
    setGridColumns,
    setLoading,
    setVisibleColumns,
    clearFilters,
    clearRowSelection,
    clearColumnVisibility,
    clearAll,
  };

  return (
    <GridTableContext.Provider value={values}>
      {children}
    </GridTableContext.Provider>
  );
};
export const UseGridTableContext = () => {
  const context = useContext(GridTableContext);
  if (!context) {
    throw new Error("useGridContext must be used within a GridProvider");
  }
  return context;
};
export default GridTableContext;