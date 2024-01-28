import React, { MutableRefObject, useContext, useRef, useState } from "react";
import { createContext } from "react";
import { Filter, SelectedCell, VisibleColumn } from "../interfaces/interfaces";

interface GridTableContextProps {
  filters: Filter[];
  itemPerPage: number;
  selectedCells: SelectedCell[];
  isDrawing: boolean;
  startCellRef: MutableRefObject<SelectedCell | null>;
  visibleColumns: VisibleColumn[];
  selectedKeys: string[];
  loading: boolean;
  setFilters: React.Dispatch<React.SetStateAction<Filter[]>>;
  setItemPerPage: React.Dispatch<React.SetStateAction<number>>;
  setSelectedCells: React.Dispatch<React.SetStateAction<SelectedCell[]>>;
  setIsDrawing: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedKeys: React.Dispatch<React.SetStateAction<string[]>>;
  setVisibleColumns: React.Dispatch<React.SetStateAction<VisibleColumn[]>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setStartCellRef: (
    newRef: React.MutableRefObject<SelectedCell | null>
  ) => void;
  clearFilters: () => void;
  clearCellSelection: () => void;
  clearRowSelection: () => void;
  clearColumnVisibility: () => void;
  clearAll: () => void;
}

const GridTableContext = createContext<GridTableContextProps>({
  filters: [],
  itemPerPage: 10,
  selectedCells: [],
  isDrawing: false,
  startCellRef: { current: null },
  visibleColumns: [],
  selectedKeys: [],
  loading: false,
  setFilters: () => {},
  setItemPerPage: () => {},
  setSelectedCells: () => {},
  setIsDrawing: () => {},
  setSelectedKeys: () => {},
  setVisibleColumns: () => {},
  setLoading: () => {},
  clearFilters: () => {},
  clearCellSelection: () => {},
  clearRowSelection: () => {},
  clearColumnVisibility: () => {},
  clearAll: () => {},
  setStartCellRef: () => {},
});
export const GenericStateProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  //Filters
  const [filters, setFilters] = useState<Filter[]>([]);
  //Pagination
  const [itemPerPage, setItemPerPage] = useState<number>(24);
  //Cell Selection
  const [selectedCells, setSelectedCells] = useState<SelectedCell[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const startCellRef = useRef<SelectedCell | null>(null);
  //Row Selection
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  //Column Visibility
  const [visibleColumns, setVisibleColumns] = useState<VisibleColumn[]>([]);
  //Generic
  const [loading, setLoading] = useState<boolean>(false);

  const setStartCellRef = (
    newRef: React.MutableRefObject<SelectedCell | null>
  ) => {
    startCellRef.current = newRef.current;
  };

  const clearFilters = () => {
    if (filters.length > 0) setFilters([]);
  };

  const clearCellSelection = () => {
    if (selectedCells.length > 0) setSelectedCells([]);
  };

  const clearRowSelection = () => {
    if (selectedKeys.length > 0) setSelectedKeys([]);
  };

  const clearColumnVisibility = () => {
    if (visibleColumns.length > 0) setVisibleColumns([]);
  };

  const clearAll = () => {
    clearFilters();
    clearCellSelection();
    clearRowSelection();
    clearColumnVisibility();
  };

  const values = {
    filters,
    itemPerPage,
    selectedCells,
    isDrawing,
    startCellRef,
    selectedKeys,
    visibleColumns,
    loading,
    setFilters,
    setItemPerPage,
    setSelectedCells,
    setIsDrawing,
    setSelectedKeys,
    setVisibleColumns,
    setStartCellRef,
    setLoading,
    clearFilters,
    clearCellSelection,
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
export const useGridTableContext = () => {
  const context = useContext(GridTableContext);
  if (!context) {
    throw new Error("useGridContext must be used within a GridProvider");
  }
  return context;
};
export default GridTableContext;
