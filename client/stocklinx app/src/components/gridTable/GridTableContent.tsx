import React, { useState, useEffect, useCallback } from "react";
import EditComponent from "./edit/EditComponent";
import TableToolbar from "./tableToolbar/TableToolbar";
import { Filter, GridtableProps } from "./interfaces/interfaces";
import { Checkbox } from "@mantine/core";
import { useFilter } from "./customhooks/filter";
import { useSelectRow } from "./customhooks/selectRow";
import { useCell } from "./customhooks/cell";
import { useSelectCell } from "./customhooks/selectCell";
import { usePaging } from "./customhooks/paging";
import { useGridTableContext } from "./context/GenericStateContext";
import "./gridtable.scss";

const GridtableContent: React.FC<GridtableProps> = ({
  data = [],
  columns = [],
  noDataText = "No Data Found",
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
  const {
    filters,
    selectedKeys,
    pageNumber,
    itemPerPage,
    setPageNumber,
    visibleColumns,
  } = useGridTableContext();

  const { handlePageNumber } = usePaging(data);
  const { getFilterInput, applyFilterToData } = useFilter(
    columns.filter((c) => c.visible !== false)
  );
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
    isDrawing,
  } = useSelectCell(filterDataByPage(filterDataByInput(data)), columns);

  const { handleSelectRow, handleselectAll, getSelectedRowClass } =
    useSelectRow(data, keyfield, isDrawing);

  const { renderColumnValue } = useCell();

  useEffect(() => {
    setKeyfield(itemKey as keyof object);
  }, [itemKey]);

  const getColSpan = (index: number) => {
    if (index === visibleColumns.length - 1 && data.length > 0) {
      return 2;
    }
    return 1;
  };

  return (
    <table className="gridtable">
      <thead>
        {enableToolbar ? (
          <tr className="gridtable__header__row">
            <td className="gridtable__header__row__cell">
              <TableToolbar
                data={data}
                columns={columns}
                excelColumns={excelColumns}
                enableExcelActions={enableExcelActions}
                handleItemPerPage={setPageNumber}
                handlePageNumber={handlePageNumber}
                onRowInsert={onRowInsert}
                onRowRemoveRange={onRowRemoveRange}
                refreshData={refreshData}
              />
            </td>
          </tr>
        ) : null}
      </thead>
      {visibleColumns.length === 0 ? (
        <tbody>
          <tr className="gridtable__nodata__row">
            <td>{noDataText}</td>
          </tr>
        </tbody>
      ) : (
        <tbody>
          <tr className="gridtable__column__row">
            {enableSelectActions ? (
              <td className="gridtable__checkbox__cell">
                <Checkbox
                  checked={
                    selectedKeys.length === data.length &&
                    selectedKeys.length > 0
                  }
                  onChange={() => handleselectAll()}
                  indeterminate={
                    selectedKeys.length > 0 && selectedKeys.length < data.length
                  }
                  radius={2}
                  size={18}
                />
              </td>
            ) : null}
            {visibleColumns.map((vColumn, vColumnIndex) => (
              <td
                key={"column__header__" + vColumn.caption + "__" + vColumnIndex}
                className="gridtable__column__cell"
                colSpan={getColSpan(vColumnIndex)}
              >
                {vColumn.renderHeader
                  ? vColumn.renderHeader()
                  : vColumn.caption}
              </td>
            ))}
          </tr>
          <tr className="gridtable__filter__row">
            {enableSelectActions ? (
              <td className="gridtable__filter__cell"></td>
            ) : null}
            {filters
              .filter((x) =>
                visibleColumns.map((v) => v.dataField).includes(x.field)
              )
              .map((filter: Filter, filterIndex) => (
                <td
                  colSpan={getColSpan(filterIndex)}
                  key={filter.field + "__" + filterIndex}
                >
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
                  ) : (
                    <td
                      key={`gridtable__row__cell__${columnIndex}__${column.dataField}`}
                    ></td>
                  )
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
              <td>{noDataText}</td>
            </tr>
          )}
        </tbody>
      )}
    </table>
  );
};

export default GridtableContent;
