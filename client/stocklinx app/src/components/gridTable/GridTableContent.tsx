import React, { useState, useEffect } from "react";
import EditComponent from "./edit/EditComponent";
import TableToolbar from "./tableToolbar/TableToolbar";
import { GridtableProps, QueryFilter } from "@interfaces/gridTableInterfaces";
import { Checkbox } from "@mantine/core";
import { useSelectRow } from "./customhooks/selectRow";
import { useCell } from "./customhooks/cell";
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
  onApplyFilters = (queryFilters: QueryFilter[]) => console.log(queryFilters),
  itemKey = "id",
  excelColumns,
  enableToolbar = false,
  enableEditActions = false,
  enableSelectActions = false,
}) => {
  const [keyfield, setKeyfield] = useState<keyof object>(
    itemKey as keyof object
  );
  const { visibleColumns, selectedKeys } = useGridTableContext();

  const { onDataColumnsChange } = useColumns(columns);

  const { expandData } = usePaging(data.length, onExpandData);

  const { handleSelectRow, handleSelectAll, getSelectedRowClass } =
    useSelectRow(data, keyfield);

  const { renderCell } = useCell();

  useEffect(() => {
    setKeyfield(itemKey as keyof object);
  }, [itemKey]);

  useEffect(() => {
    onDataColumnsChange();
  }, [columns.length]);

  return (
    <table className="gridtable">
      <tbody>
        {enableToolbar ? (
          <tr className="gridtable__header__row">
            <td className="gridtable__header__row__cell">
              <TableToolbar
                itemKey={keyfield}
                data={data}
                excelColumns={excelColumns}
                onRowRemoveRange={onRowRemoveRange}
                applyFilters={onApplyFilters}
                onRowInsert={onRowInsert}
                refreshData={refreshData}
                onExpandData={onExpandData}
              />
            </td>
          </tr>
        ) : null}
        <tr className="gridtable__column__row">
          {enableSelectActions && data.length > 0 ? (
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
                onChange={handleSelectAll}
                indeterminate={
                  selectedKeys.length > 0 && selectedKeys.length < data.length
                }
                radius={2}
                size="xs"
              />
            </td>
          ) : null}
          {enableEditActions && data.length > 0 ? (
            <td className="gridtable__edit__cell"></td>
          ) : null}
          {visibleColumns.map((vColumn) => (
            <td
              key={"$column__cell__" + vColumn.id}
              className="gridtable__column__cell"
            >
              {vColumn.renderHeader ? vColumn.renderHeader() : vColumn.caption}
            </td>
          ))}
        </tr>
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
                    size="xs"
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
              {visibleColumns.map((column) => (
                <td
                  key={`$row__cell__${column.id}__${rowIndex}`}
                  className="gridtable__row__cell"
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
