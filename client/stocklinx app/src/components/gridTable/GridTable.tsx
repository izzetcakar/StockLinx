import React, { useState, useEffect, useCallback } from "react";
import EditComponent from "./edit/EditComponent";
import TableToolbar from "./tableToolbar/TableToolbar";
import { Column, ExcelColumn, Filter } from "./interfaces/interfaces";
import PageNumber from "./tableFooter/PageNumber";
import { Checkbox } from "@mantine/core";
import "./gridtable.scss";
import { useFilter } from "./functions/filter";
import { useSelectRow } from "./functions/selectRow";
import { useVisibleColumns } from "./functions/visibleColumns";
import { useCell } from "./functions/cell";
import { useSelectCell } from "./functions/selectCell";

interface GridtableProps {
  itemKey: string;
  data: object[];
  columns: Column[];
  noDataText?: string;
  pageSizes?: number[];
  itemPerPage?: number;
  refreshData?: () => void;
  onRowInsert?: () => void;
  onRowUpdate?: (row: object) => void;
  onRowRemove?: (id: string) => void;
  excelColumns?: ExcelColumn[];
  enableExcelActions?: boolean;
  enableEditActions?: boolean;
  enableSelectActions?: boolean;
}

const Gridtable: React.FC<GridtableProps> = ({
  data = [],
  columns = [],
  itemPerPage = 5,
  refreshData,
  onRowInsert = () => console.log("Row insert"),
  onRowUpdate = (row: object) => console.log(row),
  onRowRemove = (id: string) => console.log(id),
  itemKey,
  excelColumns,
  enableExcelActions = true,
  enableEditActions = true,
  enableSelectActions = true,
}) => {
  const [pageNumber, setPageNumber] = useState<number>(0);
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
  const { filters, getFilterInput, applyFilterToData, handleFilterAll } =
    useFilter(columns, data, selectedKeys, clearSelectedKeys);
  const { renderColumnValue } = useCell();
  const filterData = useCallback(() => {
    const filteredData = applyFilterToData(data);
    if (pageNumber === 0) {
      return filteredData.slice(0, itemPerPage);
    }
    return filteredData.slice(
      pageNumber * itemPerPage,
      (pageNumber + 1) * itemPerPage
    );
  }, [data, itemPerPage, pageNumber, filters]);
  const {
    handleCellMouseDown,
    handleCellMouseUp,
    handleCellMouseEnter,
    getSelectedClassName,
  } = useSelectCell(filterData(), columns);

  useEffect(() => {
    setKeyfield(itemKey as keyof object);
  }, [itemKey]);
  useEffect(() => {
    handleVisibleColumns();
    handleFilterAll();
  }, [data]);

  const handlePageNumber = (forward: boolean) => {
    if (forward) {
      if (pageNumber + 1 < data.length / itemPerPage) {
        setPageNumber((prev) => prev + 1);
      }
    } else {
      if (pageNumber - 1 >= 0) {
        setPageNumber((prev) => prev - 1);
      }
    }
  };

  return (
    <table className="gridtable">
      <thead>
        <tr>
          <td colSpan={visibleColumns.length + 1}>
            <TableToolbar
              data={data}
              columns={columns}
              excelColumns={excelColumns}
              visibleColumns={visibleColumns}
              enableExcelActions={enableExcelActions}
              addVisibleColumn={addVisibleColumn}
              onRowInsert={onRowInsert}
              refreshData={refreshData}
            />
          </td>
        </tr>
      </thead>
      <tbody>
        <tr className="gridtable__column__container">
          {enableSelectActions ? (
            <td className="gridtable__checkbox__cell">
              <Checkbox
                checked={
                  selectedKeys.length === filterData().length &&
                  filterData().length > 0
                }
                onChange={() => handleselectAll()}
                indeterminate={
                  selectedKeys.length > 0 &&
                  selectedKeys.length < filterData().length
                }
                radius={2}
                size={18}
              />
            </td>
          ) : null}
          {visibleColumns.map((column) => (
            <td
              key={"column__header__" + column.caption}
              className="gridtable__column__cell"
            >
              {column.renderHeader ? column.renderHeader() : column.caption}
            </td>
          ))}
        </tr>
        <tr className="gridtable__filter__container">
          {enableSelectActions ? <td></td> : null}
          {filters.map((filter: Filter) => (
            <td key={filter.field} className="gridtable__filter">
              {getFilterInput(filter)}
            </td>
          ))}
        </tr>
        {filterData().length > 0 ? (
          filterData().map((obj, rowIndex) => (
            <tr
              key={"gridtable__body__row__" + rowIndex}
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
                <td className="gridtable__edit">
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
          <td className="table-footer" colSpan={visibleColumns.length + 1}>
            <PageNumber
              pageNumber={pageNumber}
              itemPerPage={itemPerPage}
              dataLength={data.length}
              handlePageNumber={handlePageNumber}
            />
          </td>
        </tr>
      </tfoot>
    </table>
  );
};

export default Gridtable;
