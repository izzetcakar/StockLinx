import { Column } from "../interfaces/interfaces";
import { useCell } from "./cell";
import { useGridTableContext } from "../context/GenericStateContext";

export const useSelectCell = (data: object[]) => {
  const { getCellValue } = useCell();
  const {
    selectedCells,
    setSelectedCells,
    isDrawing,
    setIsDrawing,
    startCellRef,
    gridColumns,
  } = useGridTableContext();

  const handleCellMouseDown = (
    rowIndex: number,
    columnIndex: number,
    column: Column,
    obj: object
  ) => {
    setIsDrawing(true);
    startCellRef.current = {
      rowIndex,
      columnIndex,
      column: column.dataField,
      value: getCellValue(obj, column),
    };
    handleCellClick(rowIndex, columnIndex, column, obj);
  };
  const handleCellMouseEnter = (
    rowIndex: number,
    columnIndex: number,
    column: Column,
    obj: object
  ) => {
    if (isDrawing) {
      handleCellClick(rowIndex, columnIndex, column, obj);
    }
  };
  const handleCellMouseUp = () => {
    setIsDrawing(false);
    copyToClipboard();
    startCellRef.current = null;
  };
  const handleCellClick = (
    rowIndex: number,
    columnIndex: number,
    column: Column,
    obj: object
  ) => {
    if (!isDrawing) {
      setSelectedCells([]);
      const isSelected = selectedCells.find(
        (cell) =>
          cell.rowIndex === rowIndex &&
          cell.columnIndex === columnIndex &&
          cell.column === column.dataField
      );
      if (!isSelected && column.selectable !== false) {
        setSelectedCells((prevSelected) => [
          ...prevSelected,
          {
            rowIndex,
            columnIndex,
            column: column.dataField,
            value: getCellValue(obj, column),
          },
        ]);
      } else {
        setSelectedCells((prevSelected) =>
          prevSelected.filter(
            (cell) =>
              !(
                cell.rowIndex === rowIndex &&
                cell.columnIndex === columnIndex &&
                cell.column === column.dataField
              )
          )
        );
      }
    } else {
      const startRow =
        startCellRef.current?.rowIndex !== undefined
          ? Math.min(startCellRef.current.rowIndex, rowIndex)
          : rowIndex;
      const endRow =
        startCellRef.current?.rowIndex !== undefined
          ? Math.max(startCellRef.current.rowIndex, rowIndex)
          : rowIndex;
      const startColumn =
        startCellRef.current?.columnIndex !== undefined
          ? Math.min(startCellRef.current.columnIndex, columnIndex)
          : columnIndex;
      const endColumn =
        startCellRef.current?.columnIndex !== undefined
          ? Math.max(startCellRef.current.columnIndex, columnIndex)
          : columnIndex;

      const cellsInRectangle = [];

      for (let i = startRow; i <= endRow; i++) {
        for (let j = startColumn; j <= endColumn; j++) {
          const newValue = (data[i] as { [key: string]: any })[
            gridColumns[j].dataField
          ];
          const currentColumn = gridColumns[j];
          const cell = {
            rowIndex: i,
            columnIndex: j,
            column: gridColumns[j].dataField,
            value: getCellValue(newValue, column),
          };
          if (currentColumn.selectable !== false) {
            cellsInRectangle.push(cell);
          }
        }
      }

      setSelectedCells(cellsInRectangle);
    }
  };
  const copyToClipboard = () => {
    let clipboardData = "";

    const maxColumnIndex = Math.max(
      ...selectedCells.map((cell) => cell.columnIndex)
    );
    for (let i = 0; i < selectedCells.length; i++) {
      const cell = selectedCells[i];

      if (cell.columnIndex === maxColumnIndex) {
        clipboardData += cell.value + "\n";
      } else {
        clipboardData += cell.value + "\t";
      }
    }

    navigator.clipboard.writeText(clipboardData);
  };
  const getSelectedClassName = (rowIndex: number, columnIndex: number) => {
    return selectedCells.find(
      (cell) => cell.rowIndex === rowIndex && cell.columnIndex === columnIndex
    ) === undefined
      ? "gridtable__row__cell"
      : "gridtable__row__cell selected";
  };

  return {
    handleCellMouseDown,
    handleCellMouseEnter,
    handleCellMouseUp,
    handleCellClick,
    getSelectedClassName,
    isDrawing,
  };
};
