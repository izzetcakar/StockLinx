import React, { useState, useEffect } from "react";
import { checkEmpty } from "../../functions/checkEmpty";
import { deepCopy } from "../../functions/deepCopy";
import { getIndexesFromArray } from "../../functions/getIndexesFromArray";
import EditComponent from "./edit/EditComponent";
import PageSizeComponent from "./pageSize/PageSizeComponent";
import TableToolbar from "./tableToolbar/TableToolbar";
import { Column } from "./interfaces/interfaces";
import "./gridTable.scss";
import TableSelectColumn from "./selection/TableSelectColumn";

interface GridTableProps {
  data?: object[];
  columns?: Column[];
  hasColumnLines?: boolean;
  showPageSizeSelector?: boolean;
  showPageSizeInfo?: boolean;
  showPageSize?: boolean;
  noDataText?: string;
  pageSizes?: number[];
  enableEdit?: boolean;
  refreshData?: () => void;
  onRowInsert?: () => void;
  onRowUpdate?: (row: object) => void;
  onRowRemove?: (row: object) => void;
}

const GridTable: React.FC<GridTableProps> = ({
  data = [],
  columns = [],
  hasColumnLines = false,
  showPageSize = false,
  showPageSizeSelector = true,
  showPageSizeInfo = true,
  pageSizes = [5, 20, 50],
  enableEdit = false,
  refreshData,
  onRowInsert = () => console.log("insert"),
  onRowUpdate = () => console.log("update"),
  onRowRemove = () => console.log("delete"),
}) => {
  const [datagridColumns, setDatagridColumns] = useState<Column[]>(columns);
  const [visibleColumns, setVisibleColumns] = useState<string[]>([]);
  const [datagrid, setDatagrid] = useState<object[]>([]);
  const [propertyDataStyle, setPropertyDataStyle] =
    useState<React.CSSProperties>({});
  const [selectedIndexes, setSelectedIndexes] = useState<number[]>([]);
  const [selectedPageSize, setSelectedPageSize] = useState<number>(
    pageSizes[0]
  );

  useEffect(() => {
    setDatagrid(deepCopy(data));
  }, [data]);

  useEffect(() => {
    handleTableStyle();
  }, [hasColumnLines]);

  useEffect(() => {
    setDatagridColumns(handleColumnsEmpty(columns));
    setVisibleColumns(columns.map((item) => item.caption));
  }, [columns, datagrid]);

  const handleVisibleColumns = (columnCaption: string): void => {
    setVisibleColumns((prevVisibleColumns) =>
      prevVisibleColumns.includes(columnCaption)
        ? prevVisibleColumns.filter((item) => item !== columnCaption)
        : [...prevVisibleColumns, columnCaption]
    );
  };

  const renderColumnValue = (rowIndex: number, column: Column) => {
    const value = (
      datagrid[rowIndex] as { [key: string]: string | number | boolean | null }
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

  const handleColumnsEmpty = (cols: Column[]): Column[] => {
    if (!checkEmpty(cols) && checkEmpty(datagrid)) {
      const newColumns: Column[] = Object.keys(datagrid[0]).map(
        (dataField) => ({
          dataField,
          caption: dataField,
        })
      );
      return newColumns;
    }
    return cols;
  };

  const handleTableStyle = () => {
    setPropertyDataStyle({
      borderLeft: hasColumnLines ? "0.0625rem solid #ced4da" : "none",
    });
  };

  const filterData = () => {
    return datagrid.slice(0, selectedPageSize);
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
    <div className="table-container">
      <TableToolbar
        columns={datagridColumns}
        visibleColumns={visibleColumns}
        handleVisibleColumns={handleVisibleColumns}
        onRowInsert={onRowInsert}
        refreshData={handleRefreshData}
      />
      <div className="table-edit-wrapper">
        <TableSelectColumn
          datagrid={datagrid}
          selectedIndexes={selectedIndexes}
          filterData={filterData}
          setSelectedIndexes={setSelectedIndexes}
          handleClassByIndex={handleClassByIndex}
        />
        <div className="table-content-container">
          {datagridColumns.map((column, columnIndex) =>
            visibleColumns.includes(column.caption) ? (
              <div
                className="column-container"
                key={columnIndex}
                style={propertyDataStyle}
              >
                <div className="column-title">{column.caption}</div>
                {filterData().map((_, rowIndex) => (
                  <div className={handleClassByIndex(rowIndex)} key={rowIndex}>
                    {renderColumnValue(rowIndex, column)}
                  </div>
                ))}
              </div>
            ) : null
          )}
        </div>
        {enableEdit ? (
          <div className="column-container column-edit">
            <div className="column-title"></div>
            {getIndexesFromArray(filterData()).map((_, rowIndex) => (
              <div className={handleClassByIndex(rowIndex)} key={rowIndex}>
                <EditComponent
                  datagrid={datagrid}
                  rowIndex={rowIndex}
                  onRowUpdate={onRowUpdate}
                  onRowRemove={onRowRemove}
                />
              </div>
            ))}
          </div>
        ) : null}
      </div>
      <div className="page-end-container">
        <PageSizeComponent
          showPageSize={showPageSize}
          showPageSizeInfo={showPageSizeInfo}
          showPageSizeSelector={showPageSizeSelector}
          allItemsCount={datagrid.length}
          handleSizeSelect={handleSelectedPageSize}
          pageSizes={pageSizes}
          selectedCount={selectedIndexes.length}
          selectedSize={selectedPageSize}
        />
      </div>
    </div>
  );
};

export default GridTable;
