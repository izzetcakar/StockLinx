import { useRef, useState } from "react";
import { Filter, SelectedCell, VisibleColumn } from "../interfaces/interfaces";

export const useGenericStates = () => {
  //Filters
  const [filters, setFilters] = useState<Filter[]>([]);
  //Pagination
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [itemPerPage, setItemPerPage] = useState<number>(10);
  //Cell Selection
  const [selectedCells, setSelectedCells] = useState<SelectedCell[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const startCellRef = useRef<SelectedCell | null>();
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

  return {
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
};
