import React, { useState, useEffect, useCallback } from "react";
import EditComponent from "./edit/EditComponent";
import TableToolbar from "./tableToolbar/TableToolbar";
import { GridtableProps } from "./interfaces/interfaces";
import { Checkbox } from "@mantine/core";
import { useFilter } from "./customhooks/filter";
import { useSelectRow } from "./customhooks/selectRow";
import { useCell } from "./customhooks/cell";
import { useSelectCell } from "./customhooks/selectCell";
import { useGridTableContext } from "./context/GenericStateContext";
import { useVisibleColumns } from "./customhooks/visibleColumnsHook";
import { usePaging } from "./customhooks/paging";
import "./gridtable.scss";

const GridtableContent: React.FC<GridtableProps> = ({
  data = [],
  columns = [],
  noDataText = "No Data Found",
  refreshData,
  onRowInsert,
  onRowUpdate = (row: object) => console.log(row),
  onRowRemove = (id: string) => console.log(id),
  onRowRemoveRange = (ids: string[]) => console.log(ids),
  onExpandData,
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
  const { selectedKeys, visibleColumns } = useGridTableContext();

  const { createVisibleColumns } = useVisibleColumns(columns);

  const { expandData } = usePaging(data.length, onExpandData);

  const { applyFilterToData } = useFilter(
    columns.filter((c) => c.visible !== false)
  );
  const filterDataByInput = useCallback(
    (inputData: object[]) => {
      return applyFilterToData(inputData);
    },
    [applyFilterToData]
  );

  const {
    handleCellMouseDown,
    handleCellMouseUp,
    handleCellMouseEnter,
    getSelectedClassName,
    isDrawing,
  } = useSelectCell(filterDataByInput(data), columns);

  const { handleSelectRow, handleselectAll, getSelectedRowClass } =
    useSelectRow(data, keyfield, isDrawing);

  const { renderColumnValue } = useCell();

  useEffect(() => {
    setKeyfield(itemKey as keyof object);
  }, [itemKey]);

  useEffect(() => {
    createVisibleColumns();
  }, [columns]);

  return (
    <table className="gridtable">
      <tbody>
        {enableToolbar ? (
          <tr className="gridtable__header__row">
            <td className="gridtable__header__row__cell">
              <TableToolbar
                data={data}
                columns={columns}
                excelColumns={excelColumns}
                enableExcelActions={enableExcelActions}
                itemKey={keyfield}
                onRowInsert={onRowInsert}
                onRowRemoveRange={onRowRemoveRange}
                refreshData={refreshData}
                onExpandData={onExpandData}
              />
            </td>
          </tr>
        ) : null}
        <tr className="gridtable__column__row">
          {enableSelectActions ? (
            <td className="gridtable__checkbox__cell">
              <Checkbox
                checked={
                  selectedKeys.length === data.length && selectedKeys.length > 0
                }
                disabled={filterDataByInput(data).length < 1}
                onChange={() => handleselectAll()}
                indeterminate={
                  selectedKeys.length > 0 && selectedKeys.length < data.length
                }
                radius={2}
                size={18}
              />
            </td>
          ) : null}
          {enableEditActions ? (
            <td className="gridtable__edit__cell"></td>
          ) : null}
          {visibleColumns.map((vColumn, vColumnIndex) => (
            <td
              key={"column__header__" + vColumn.caption + "__" + vColumnIndex}
              className="gridtable__column__cell"
            >
              {vColumn.renderHeader ? vColumn.renderHeader() : vColumn.caption}
            </td>
          ))}
        </tr>
        {/* <tr className="gridtable__filter__row">
          {enableSelectActions ? (
            <td className="gridtable__filter__cell"></td>
          ) : null}
          {enableEditActions ? (
            <td className="gridtable__filter__cell"></td>
          ) : null}
          {filters
            .filter((x) =>
              visibleColumns.map((v) => v.dataField).includes(x.field)
            )
            .map((filter: Filter, filterIndex) => (
              <td
                key={filter.field + "__" + filterIndex}
                className="gridtable__filter__cell"
              >
                {getFilterInput(filter)}
              </td>
            ))}
        </tr> */}
        {filterDataByInput(data).length > 0 ? (
          filterDataByInput(data).map((obj, rowIndex) => (
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
              {columns
                .filter((column) => column.visible !== false)
                .map((column, columnIndex) => (
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
                ))}
            </tr>
          ))
        ) : (
          <tr className="gridtable__nodata__row">
            <td>{noDataText}</td>
          </tr>
        )}
        {onExpandData ? (
          <tr className="gridtable__expand__data__row">
            <td className="gridtable__expand__data__cell">
              <button
                className="gridtable__expand__data__btn"
                onClick={() => expandData()}
              >
                Load More
              </button>
            </td>
          </tr>
        ) : null}
      </tbody>
    </table>
  );
};

export default GridtableContent;
