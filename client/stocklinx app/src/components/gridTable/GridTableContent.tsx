import React, { useEffect, useRef } from "react";
import TableToolbar from "./tableToolbar/TableToolbar";
import { GridtableProps, QueryFilter } from "@interfaces/gridTableInterfaces";
import { Checkbox } from "@mantine/core";
import { useSelectRow } from "./hooks/selectRow";
import { UseGridTableContext } from "./context/GenericStateContext";
import { useColumns } from "./hooks/columns";
import { MemoizedRow } from "./utils/cellUtils";
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
  onRowDetail = (row: object) => console.log(row),
  itemKey = "id",
  excelColumns,
  enableToolbar = false,
  enableEditActions = false,
  enableSelectActions = false,
}) => {
  const keyfield = itemKey as keyof object;
  const { visibleColumns, selectedKeys } = UseGridTableContext();
  const { onDataColumnsChange } = useColumns(columns);
  const { handleSelectRow, handleSelectAll, getSelectedRowClass } =
    useSelectRow(data, keyfield);
  const tableBodyRef = useRef<HTMLTableSectionElement>(null);

  useEffect(() => {
    onDataColumnsChange();
  }, [columns.length]);

  return (
    <>
      {enableToolbar ? (
        <TableToolbar
          itemKey={keyfield}
          data={data}
          excelColumns={excelColumns}
          onRowRemoveRange={onRowRemoveRange}
          applyFilters={onApplyFilters}
          onRowInsert={onRowInsert}
          refreshData={refreshData}
          onExpandData={onExpandData}
          onRowDetail={onRowDetail}
        />
      ) : null}
      <table className="gridtable">
        <tbody ref={tableBodyRef}>
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
                    selectedKeys.length === data.length &&
                    selectedKeys.length > 0
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
                {vColumn.renderHeader
                  ? vColumn.renderHeader()
                  : vColumn.caption}
              </td>
            ))}
          </tr>
          {data.length > 0 ? (
            data.map((obj, rowIndex) => (
              <MemoizedRow
                key={"$row__" + rowIndex}
                obj={obj}
                columns={visibleColumns}
                keyfield={keyfield}
                enableSelectActions={enableSelectActions}
                enableEditActions={enableEditActions}
                selectedKeys={selectedKeys}
                handleSelectRow={handleSelectRow}
                getSelectedRowClass={getSelectedRowClass}
                onRowUpdate={onRowUpdate}
                onRowRemove={onRowRemove}
              />
            ))
          ) : (
            <tr className="gridtable__nodata__row">
              <td>{noDataText}</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

export default GridtableContent;
