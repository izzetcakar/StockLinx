import React, { useState, useEffect, useCallback } from "react";
import { checkEmpty } from "../../functions/checkEmpty";
import { getIndexesFromArray } from "../../functions/getIndexesFromArray";
import EditComponent from "./edit/EditComponent";
import PageSizeComponent from "./pageSize/PageSizeComponent";
import TableToolbar from "./tableToolbar/TableToolbar";
import { Column } from "./interfaces/interfaces";
import TableSelectColumn from "./selection/TableSelectColumn";
import "./gridTable.scss";

interface GridTableProps {
  data: object[];
  columns?: Column[];
  showPageSizeSelector?: boolean;
  showPageSizeInfo?: boolean;
  showPageSize?: boolean;
  noDataText?: string;
  pageSizes?: number[];
  enableEdit?: boolean;
  enableSelection?: boolean;
  refreshData?: () => void;
  onRowInsert?: () => void;
  onRowUpdate?: (row: object) => void;
  onRowRemove?: (row: object) => void;
}

const GridTable: React.FC<GridTableProps> = ({
  data = [],
  columns = [],
  showPageSize = false,
  showPageSizeSelector = true,
  showPageSizeInfo = true,
  pageSizes = [5, 20, 50],
  enableEdit = false,
  enableSelection = false,
  refreshData,
  onRowInsert = () => console.log("insert"),
  onRowUpdate = () => console.log("update"),
  onRowRemove = () => console.log("delete"),
}) => {
  const [dataColumns, setDataColumns] = useState<Column[]>(columns);
  const [visibleColumns, setVisibleColumns] = useState<string[]>([]);
  const [selectedIndexes, setSelectedIndexes] = useState<number[]>([]);
  const [selectedPageSize, setSelectedPageSize] = useState<number>(
    pageSizes[0]
  );

  useEffect(() => {
    setDataColumns(handleColumnsEmpty(columns));
  }, [data]);

  const addVisibleColumn = (columnCaption: string): void => {
    setVisibleColumns((prev) =>
      prev.includes(columnCaption)
        ? prev.filter((item) => item !== columnCaption)
        : [...prev, columnCaption]
    );
  };

  const renderColumnValue = (rowIndex: number, column: Column) => {
    const value = (
      data[rowIndex] as { [key: string]: string | number | boolean | null }
    )[column.dataField];

    if (column.renderComponent) {
      return column.renderComponent(value);
    }
    if (value === null || value === undefined) {
      return "";
    }
    if (typeof value === "boolean") {
      const name = value ? "check" : "x";
      const color = value ? "#63bd4f" : "#ed6b6b";
      return (
        <i
          className={`bx bx-${name}`}
          style={{ fontSize: "1.5rem", color: color }}
        />
      );
    }
    return value;
  };

  const handleColumnsEmpty = useCallback(
    (cols: Column[]): Column[] => {
      if (!checkEmpty(cols)) {
        const newColumns = Object.keys(data[0]).map((dataField) => ({
          dataField,
          caption: dataField,
        }));
        setVisibleColumns(newColumns.map((item) => item.caption));
        return newColumns;
      }
      setVisibleColumns(cols.map((item) => item.caption));
      return cols;
    },
    [data]
  );

  const filterData = () => {
    return data.slice(0, selectedPageSize);
  };

  const handleSelectedPageSize = (newSize: number) => {
    setSelectedPageSize(newSize);
    setSelectedIndexes([]);
  };

  const handleRefreshData = () => {
    if (!refreshData) {
      return;
    }
    refreshData();
  };

  const handleClassByIndex = (index: number) => {
    return selectedIndexes.includes(index) ? `cell selected-cell` : `cell`;
  };

  return (
    <div className="all-wrapper">
      <div className="table">
        <TableToolbar
          columns={dataColumns}
          visibleColumns={visibleColumns}
          addVisibleColumn={addVisibleColumn}
          onRowInsert={onRowInsert}
          refreshData={handleRefreshData}
        />
        <div className="table-wrapper">
          {enableSelection ? (
            <TableSelectColumn
              data={data}
              selectedIndexes={selectedIndexes}
              filterData={filterData}
              setSelectedIndexes={setSelectedIndexes}
              handleClassByIndex={handleClassByIndex}
            />
          ) : null}
          <div className="table-content">
            {dataColumns.map((column, columnIndex) =>
              visibleColumns.includes(column.caption) ? (
                <div className="table-column" key={columnIndex}>
                  <div className="table-column-title">{column.caption}</div>
                  {filterData().map((_, rowIndex) => (
                    <div
                      className={handleClassByIndex(rowIndex)}
                      key={rowIndex}
                    >
                      {renderColumnValue(rowIndex, column)}
                    </div>
                  ))}
                </div>
              ) : null
            )}
          </div>
          {enableEdit ? (
            <div className="table-column">
              <div className="table-column-title"></div>
              {getIndexesFromArray(filterData()).map((_, index) => (
                <div className={handleClassByIndex(index)} key={index}>
                  <EditComponent
                    data={data}
                    index={index}
                    onRowUpdate={onRowUpdate}
                    onRowRemove={onRowRemove}
                  />
                </div>
              ))}
            </div>
          ) : null}
        </div>
        <div>
          <PageSizeComponent
            showPageSize={showPageSize}
            showPageSizeInfo={showPageSizeInfo}
            showPageSizeSelector={showPageSizeSelector}
            allItemsCount={data.length}
            handleSizeSelect={handleSelectedPageSize}
            pageSizes={pageSizes}
            selectedCount={selectedIndexes.length}
            selectedSize={selectedPageSize}
          />
        </div>
      </div>
      <table className="table2">
        <thead>
          <tr className="table2-toolbar">
            <td className="table2-toolbar" colSpan={visibleColumns.length + 1}>
              <TableToolbar
                columns={dataColumns}
                visibleColumns={visibleColumns}
                addVisibleColumn={addVisibleColumn}
                onRowInsert={onRowInsert}
                refreshData={handleRefreshData}
              />
              {enableSelection ? (
                <TableSelectColumn
                  data={data}
                  selectedIndexes={selectedIndexes}
                  filterData={filterData}
                  setSelectedIndexes={setSelectedIndexes}
                  handleClassByIndex={handleClassByIndex}
                />
              ) : null}
            </td>
          </tr>
          <tr>
            {visibleColumns.map((column) => (
              <th key={column}>{column}</th>
            ))}
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filterData().map((_, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((column) =>
                visibleColumns.includes(column.caption) ? (
                  <td key={`${rowIndex}-${column.caption}`}>
                    {renderColumnValue(rowIndex, column)}
                  </td>
                ) : null
              )}
              <td>
                <EditComponent
                  data={data}
                  index={rowIndex}
                  onRowUpdate={onRowUpdate}
                  onRowRemove={onRowRemove}
                />
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="table2-selection">
            <td
              className="table2-selection"
              colSpan={visibleColumns.length + 1}
            >
              <PageSizeComponent
                showPageSize={true}
                showPageSizeInfo={true}
                showPageSizeSelector={true}
                allItemsCount={data.length}
                handleSizeSelect={handleSelectedPageSize}
                pageSizes={pageSizes}
                selectedCount={selectedIndexes.length}
                selectedSize={selectedPageSize}
              />
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default GridTable;
