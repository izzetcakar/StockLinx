import React, { useState, useEffect, useCallback } from "react";
import EditComponent from "./edit/EditComponent";
import TableToolbar from "./tableToolbar/TableToolbar";
import { Column, ExcelColumn, Filter } from "./interfaces/interfaces";
import { Checkbox } from "@mantine/core";
import { useFilter } from "./functions/filter";
import { useSelectRow } from "./functions/selectRow";
import { useVisibleColumns } from "./functions/visibleColumns";
import { useCell } from "./functions/cell";
import { useSelectCell } from "./functions/selectCell";
import { usePaging } from "./functions/paging";
import TableFooter from "./tableFooter/TableFooter";
import "./gridtable.scss";

interface GridtableProps {
  itemKey: string;
  data: object[];
  columns: Column[];
  noDataText?: string;
  pageSizes?: number[];
  refreshData?: () => void;
  onRowInsert?: () => void;
  onRowUpdate?: (row: object) => void;
  onRowRemove?: (id: string) => void;
  onRowRemoveRange?: (ids: string[]) => void;
  excelColumns?: ExcelColumn[];
  enableToolbar?: boolean;
  enableExcelActions?: boolean;
  enableEditActions?: boolean;
  enableSelectActions?: boolean;
}

const Gridtable: React.FC<GridtableProps> = ({
  data = [],
  columns = [],
  refreshData,
  onRowInsert = () => console.log("Row insert"),
  onRowUpdate = (row: object) => console.log(row),
  onRowRemove = (id: string) => console.log(id),
  onRowRemoveRange = (ids: string[]) => console.log(ids),
  itemKey,
  excelColumns,
  enableToolbar = false,
  enableExcelActions = false,
  enableEditActions = false,
  enableSelectActions = false,
}) => {
  const [keyfield, setKeyfield] = useState<keyof object>(
    itemKey as keyof object
  );
  const { visibleColumns, handleVisibleColumns, addVisibleColumn } =
    useVisibleColumns(columns);
  const {
    selectedKeys,
    handleSelectRow,
    handleselectAll,
    getSelectedRowClass,
    clearSelectedKeys,
  } = useSelectRow(data, keyfield);

  const {
    handlePageNumber,
    handleItemPerPage,
    resetPageNumber,
    itemPerPage,
    pageNumber,
  } = usePaging(data);
  const { filters, getFilterInput, applyFilterToData, handleFilterAll } =
    useFilter(columns, data, selectedKeys, clearSelectedKeys, resetPageNumber);

  const { renderColumnValue } = useCell();

  const filterDataByInput = useCallback(
    (inputData: object[]) => {
      return applyFilterToData(inputData);
    },
    [applyFilterToData]
  );

  const filterDataByPage = useCallback(
    (inputData: object[]) => {
      if (pageNumber === 0) {
        return inputData.slice(0, itemPerPage);
      }
      return inputData.slice(
        pageNumber * itemPerPage,
        (pageNumber + 1) * itemPerPage
      );
    },
    [itemPerPage, pageNumber]
  );

  const {
    handleCellMouseDown,
    handleCellMouseUp,
    handleCellMouseEnter,
    getSelectedClassName,
  } = useSelectCell(filterDataByPage(filterDataByInput(data)), columns);

  useEffect(() => {
    setKeyfield(itemKey as keyof object);
  }, [itemKey]);

  useEffect(() => {
    handleVisibleColumns();
    handleFilterAll();
  }, [data]);

  const handleColSpan = (index: number) => {
    if (index === filters.length - 1 && enableEditActions) {
      return 2;
    }
    return 1;
  };

  return (
    <table className="gridtable">
      {enableToolbar ? (
        <thead>
          <tr>
            <td colSpan={visibleColumns.length + 1}>
              <TableToolbar
                data={data}
                columns={columns}
                excelColumns={excelColumns}
                visibleColumns={visibleColumns}
                enableExcelActions={enableExcelActions}
                selectedKeys={selectedKeys}
                addVisibleColumn={addVisibleColumn}
                onRowInsert={onRowInsert}
                onRowRemoveRange={onRowRemoveRange}
                refreshData={refreshData}
              />
            </td>
          </tr>
        </thead>
      ) : null}
      <tbody>
        <tr className="gridtable__column__row">
          {enableSelectActions ? (
            <td className="gridtable__checkbox__cell border__bottom">
              <Checkbox
                checked={
                  selectedKeys.length === filterDataByInput(data).length &&
                  selectedKeys.length > 0
                }
                onChange={() => handleselectAll()}
                indeterminate={
                  selectedKeys.length > 0 &&
                  selectedKeys.length <
                    filterDataByInput(data).length
                }
                radius={2}
                size={18}
              />
            </td>
          ) : null}
          {visibleColumns.map((vColumn, vColumnIndex) => (
            <td
              key={"column__header__" + vColumn.caption}
              className="gridtable__column__cell"
              colSpan={handleColSpan(vColumnIndex)}
            >
              {vColumn.renderHeader ? vColumn.renderHeader() : vColumn.caption}
            </td>
          ))}
        </tr>
        <tr className="gridtable__filter__row">
          {enableSelectActions ? (
            <td className="gridtable__filter__cell"></td>
          ) : null}
          {filters.map((filter: Filter, filterIndex) => (
            <td colSpan={handleColSpan(filterIndex)} key={filter.field}>
              {getFilterInput(filter)}
            </td>
          ))}
        </tr>
        {filterDataByPage(filterDataByInput(data)).length > 0 ? (
          filterDataByPage(filterDataByInput(data)).map((obj, rowIndex) => (
            <tr
              key={"gridtable__row__" + rowIndex}
              className={getSelectedRowClass(obj[keyfield])}
            >
              {enableSelectActions ? (
                <td className="gridtable__checkbox__cell">
                  <Checkbox
                    checked={selectedKeys.includes(obj[keyfield])}
                    onChange={() => handleSelectRow(obj[keyfield])}
                    radius={2}
                    size={18}
                  />
                </td>
              ) : null}
              {columns.map((column, columnIndex) =>
                visibleColumns
                  .map((x) => x.caption)
                  .includes(column.caption) ? (
                  <td
                    key={`gridtable__row__cell__${columnIndex}__${column.dataField}`}
                    className={getSelectedClassName(rowIndex, columnIndex)}
                    onMouseDown={() =>
                      handleCellMouseDown(
                        rowIndex,
                        columnIndex,
                        column,
                        (obj as { [key: string]: any })[column.dataField]
                      )
                    }
                    onMouseEnter={() =>
                      handleCellMouseEnter(
                        rowIndex,
                        columnIndex,
                        column,
                        (obj as { [key: string]: any })[column.dataField]
                      )
                    }
                    onMouseUp={handleCellMouseUp}
                  >
                    {renderColumnValue(obj, column)}
                  </td>
                ) : null
              )}
              {enableEditActions ? (
                <td className="gridtable__edit__cell">
                  <EditComponent
                    obj={obj}
                    id={obj[keyfield]}
                    onRowUpdate={onRowUpdate}
                    onRowRemove={onRowRemove}
                  />
                </td>
              ) : null}
            </tr>
          ))
        ) : (
          <tr className="gridtable__nodata__row">
            <td>No Data</td>
          </tr>
        )}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan={visibleColumns.length + 1}>
            <TableFooter
              dataLength={data.length}
              itemPerPage={itemPerPage}
              pageNumber={pageNumber}
              handleItemPerPage={handleItemPerPage}
              handlePageNumber={handlePageNumber}
            />
          </td>
        </tr>
      </tfoot>
    </table>
  );
};

export default Gridtable;
