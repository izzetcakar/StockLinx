import React, { MutableRefObject, ReactNode, useRef, useState } from "react";
import { createContext } from "react";
import { Filter, SelectedCell, VisibleColumn } from "../interfaces/interfaces";

interface GenericStateProviderProps {
  children: ReactNode;
}
interface GenericStateContextValues {
  filters: Filter[];
  pageNumber: number;
  itemPerPage: number;
  selectedCells: SelectedCell[];
  isDrawing: boolean;
  startCellRef: MutableRefObject<SelectedCell | null>;
  visibleColumns: VisibleColumn[];
  selectedKeys: string[];
  setFilters: (filters: Filter[]) => void;
  setPageNumber: (pageNumber: number) => void;
  setItemPerPage: (itemPerPage: number) => void;
  setSelectedCells: (selectedCells: SelectedCell[]) => void;
  setIsDrawing: (isDrawing: boolean) => void;
  setSelectedKeys: (selectedKeys: string[]) => void;
  setVisibleColumns: (visibleColumns: VisibleColumn[]) => void;
  clearFilters: () => void;
  clearPagination: () => void;
  clearCellSelection: () => void;
  clearRowSelection: () => void;
  clearColumnVisibility: () => void;
  clearAll: () => void;
}

export const GenericStateContext = createContext<GenericStateContextValues>({
  filters: [],
  pageNumber: 0,
  itemPerPage: 10,
  selectedCells: [],
  isDrawing: false,
  startCellRef: { current: null },
  visibleColumns: [],
  selectedKeys: [],
  setFilters: () => {},
  setPageNumber: () => {},
  setItemPerPage: () => {},
  setSelectedCells: () => {},
  setIsDrawing: () => {},
  setSelectedKeys: () => {},
  setVisibleColumns: () => {},
  clearFilters: () => {},
  clearPagination: () => {},
  clearCellSelection: () => {},
  clearRowSelection: () => {},
  clearColumnVisibility: () => {},
  clearAll: () => {},
});
export const GenericStateProvider: React.FC<GenericStateProviderProps> = ({
  children,
}) => {
  //Filters
  const [filters, setFilters] = useState<Filter[]>([]);
  //Pagination
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [itemPerPage, setItemPerPage] = useState<number>(10);
  //Cell Selection
  const [selectedCells, setSelectedCells] = useState<SelectedCell[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const startCellRef = useRef<SelectedCell | null>(null);
  //Row Selection
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  //Column Visibility
  const [visibleColumns, setVisibleColumns] = useState<VisibleColumn[]>([]);

  const clearFilters = () => {
    if (filters.length > 0) setFilters([]);
  };

  const clearPagination = () => {
    if (pageNumber !== 0) setPageNumber(0);
    if (itemPerPage !== 10) setItemPerPage(10);
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
    clearPagination();
    clearCellSelection();
    clearRowSelection();
    clearColumnVisibility();
  };

  const values = {
    filters,
    pageNumber,
    itemPerPage,
    selectedCells,
    isDrawing,
    startCellRef,
    selectedKeys,
    visibleColumns,
    setFilters,
    setPageNumber,
    setItemPerPage,
    setSelectedCells,
    setIsDrawing,
    setSelectedKeys,
    setVisibleColumns,
    clearFilters,
    clearPagination,
    clearCellSelection,
    clearRowSelection,
    clearColumnVisibility,
    clearAll,
  };

  return (
    <GenericStateContext.Provider value={values}>
      {children}
    </GenericStateContext.Provider>
  );
};
export default GenericStateContext;
