import React, { useState, useEffect, useRef } from "react";
import TableToolbar from "./tableToolbar/TableToolbar";
import { GridtableProps, QueryFilter } from "@interfaces/gridTableInterfaces";
import { Checkbox } from "@mantine/core";
import { useSelectRow } from "./hooks/selectRow";
import { UseGridTableContext } from "./context/GenericStateContext";
import { useColumns } from "./hooks/columns";
import { usePaging } from "./hooks/paging";
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
  const [keyfield, setKeyfield] = useState<keyof object>(
    itemKey as keyof object
  );
  const { visibleColumns, selectedKeys } = UseGridTableContext();
  const { onDataColumnsChange } = useColumns(columns);
  const { expandData } = usePaging(data.length, onExpandData);
  const { handleSelectRow, handleSelectAll, getSelectedRowClass } =
    useSelectRow(data, keyfield);
  const [scrollTop, setScrollTop] = useState(0);
  const tableBodyRef = useRef<HTMLTableSectionElement>(null);

  useEffect(() => {
    setKeyfield(itemKey as keyof object);
  }, [itemKey]);

  useEffect(() => {
    onDataColumnsChange();
  }, [columns.length]);

  const [dimensions, setDimensions] = useState({
    rowHeight: 28,
    visibleRowCount: 10,
  });

  useEffect(() => {
    const updateDimensions = () => {
      if (tableBodyRef.current) {
        const container = tableBodyRef.current;
        const containerHeight = container.clientHeight;
        const rowElement = container.querySelector(".gridtable__row");

        if (rowElement) {
          const rowHeight = rowElement.clientHeight;
          const visibleRowCount = Math.floor(containerHeight / rowHeight);
          setDimensions({
            rowHeight,
            visibleRowCount,
          });
        }
      }
    };

    setTimeout(() => {
      updateDimensions();
    }, 100);

    window.addEventListener("resize", updateDimensions);

    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);

  const { rowHeight, visibleRowCount } = dimensions;

  const startRow = Math.floor(scrollTop / rowHeight);
  const endRow = startRow + visibleRowCount;
  const visibleData = data.slice(startRow, endRow);

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
          {visibleData.length > 0 ? (
            visibleData.map((obj, rowIndex) => (
              <MemoizedRow
                key={"$row__" + (startRow + rowIndex)}
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
    </>
  );
};

export default GridtableContent;
