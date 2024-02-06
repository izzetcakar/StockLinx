import React, { useState, useEffect } from "react";
import EditComponent from "./edit/EditComponent";
import TableToolbar from "./tableToolbar/TableToolbar";
import { GridtableProps } from "./interfaces/interfaces";
import { Checkbox } from "@mantine/core";
import { useSelectRow } from "./customhooks/selectRow";
import { useCell } from "./customhooks/cell";
import { useSelectCell } from "./customhooks/selectCell";
import { useGridTableContext } from "./context/GenericStateContext";
import { useColumns } from "./customhooks/columns";
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
  const { gridColumns, selectedKeys } = useGridTableContext();

  const { handleBaseColumnsChange } = useColumns(columns);

  const { expandData } = usePaging(data.length, onExpandData);

  // const filterDataByInput = useCallback(
  //   (inputData: object[]) => {
  //     return applyFilterToData(inputData);
  //   },
  //   [applyFilterToData]
  // );

  const {
    handleCellMouseDown,
    handleCellMouseUp,
    handleCellMouseEnter,
    getSelectedClassName,
    isDrawing,
  } = useSelectCell(data);

  const { handleSelectRow, handleselectAll, getSelectedRowClass } =
    useSelectRow(data, keyfield, isDrawing);

  const { renderCell } = useCell();

  useEffect(() => {
    setKeyfield(itemKey as keyof object);
  }, [itemKey]);

  useEffect(() => {
    handleBaseColumnsChange();
  }, [columns]);

  return (
    <table className="gridtable">
      <tbody>
        {enableToolbar ? (
          <tr className="gridtable__header__row">
            <td className="gridtable__header__row__cell">
              <TableToolbar
                data={data}
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
            <td className="gridtable__column__cell checkbox">
              {selectedKeys.length > 0 ? (
                <div className="gridtable__selected__count">
                  ({selectedKeys.length})
                </div>
              ) : null}
              <Checkbox
                checked={
                  selectedKeys.length === data.length && selectedKeys.length > 0
                }
                disabled={data.length < 1}
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
          {gridColumns.map((vColumn) => (
            <td
              key={"$column__cell__" + vColumn.id}
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
        {data.length > 0 ? (
          data.map((obj, rowIndex) => (
            <tr
              key={"$row__" + rowIndex}
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
              {gridColumns
                .filter((column) => column.visible !== false)
                .map((column, columnIndex) => (
                  <td
                    key={`$row__cell__${column.id}__${rowIndex}`}
                    className={getSelectedClassName(rowIndex, columnIndex)}
                    onMouseDown={() =>
                      handleCellMouseDown(rowIndex, columnIndex, column, obj)
                    }
                    onMouseEnter={() =>
                      handleCellMouseEnter(rowIndex, columnIndex, column, obj)
                    }
                    onMouseUp={handleCellMouseUp}
                  >
                    {renderCell(obj, column)}
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
