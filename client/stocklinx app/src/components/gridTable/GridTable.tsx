import React, { useState, useEffect } from "react";
import "./gridTable.scss";
import { checkEmpty } from "../../functions/checkEmpty";
import { hasAllElements } from "../../functions/hasAllElements";
import { deepCopy } from "../../functions/deepCopy";
import { getIndexesFromArray } from "../../functions/getIndexesFromArray";
import EditComponent from "./edit/EditComponent";
import SelectComponent from "./select/SelectComponent";
import PageSizeComponent from "./pageSize/PageSizeComponent";
import Toolbar from "./toolbar/Toolbar";
import { Column } from "./interfaces/interfaces";
import { Checkbox, LoadingOverlay } from '@mantine/core';

interface GridTableProps {
  data?: object[];
  columns?: Column[];
  hasColumnLines?: boolean;
  showPageSizeSelector?: boolean;
  showPageSizeInfo?: boolean;
  showPageSize?: boolean;
  noDataText?: string;
  pageSizes?: number[];
  cellCssClass?: string;
  enableEdit?: boolean;
  refreshData?: () => Promise<void> | void;
  onRowInsert: () => void;
  onRowUpdate: (row: object) => void;
  onRowDelete: (row: object) => void;
  onStartEdit?: (row: object) => void;
}

const GridTable: React.FC<GridTableProps> = ({
  data = [],
  columns = [],
  hasColumnLines = false,
  showPageSize = false,
  showPageSizeSelector = true,
  showPageSizeInfo = true,
  noDataText = "No Data to Display",
  pageSizes = [1, 3, 5],
  cellCssClass = "",
  enableEdit = false,
  refreshData,
  onRowInsert = () => console.log("insert"),
  onRowUpdate = () => console.log("update"),
  onRowDelete = () => console.log("delete"),
  onStartEdit = () => console.log("start edit"),
}) => {
  const [datagridColumns, setDatagridColumns] = useState<Column[]>(columns);
  const [visibleColumns, setVisibleColumns] = useState<string[]>([]);
  const [datagrid, setDatagrid] = useState<object[]>([]);
  const [propertyDataStyle, setPropertyDataStyle] = useState<React.CSSProperties>({});
  const [selectedIndexes, setSelectedIndexes] = useState<number[]>([]);
  const [selectedPageSize, setSelectedPageSize] = useState<number>(pageSizes[0]);
  const [loadingVisible, setLoadingVisible] = useState<boolean>(false);

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

  const handleSelectRow = (index: number) => {
    setSelectedIndexes((prevIndexes) =>
      prevIndexes.includes(index)
        ? prevIndexes.filter((i) => i !== index)
        : [...prevIndexes, index]
    );
  };

  const handleSelectAll = () => {
    setSelectedIndexes((prevIndexes) =>
      hasAllElements(getIndexesFromArray(filterData()), prevIndexes)
        ? []
        : getIndexesFromArray(datagrid)
    );
  };

  const renderColumnValue = (rowIndex: number, column: Column) => {
    const value = (datagrid[rowIndex] as { [key: string]: React.ReactNode | string | number | boolean | null })[column.dataField];

    if (column.renderComponent) {
      const RenderComponent = column.renderComponent;
      return <RenderComponent value={value} />;
    }

    if (value === null || value === undefined) {
      return "";
    }

    if (typeof value === "boolean") {
      const name = value ? "check" : "x";
      const color = value ? "#63bd4f" : "#ed6b6b";
      return <i className={`bx bx-${name}`} style={{ fontSize: "1.5rem", color: color }} />;
    }

    return value;
  };

  const handleColumnsEmpty = (cols: Column[]): Column[] => {
    if (!checkEmpty(cols) && checkEmpty(datagrid)) {
      const newColumns: Column[] = Object.keys(datagrid[0]).map((dataField) => ({
        dataField,
        caption: dataField,
        dataType: typeof dataField,
      }));
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

  const handleLoadingVisible = (visible: boolean) => {
    setLoadingVisible(visible);
  };
  const handleRefreshData = async () => {
    if (!refreshData) {
      return;
    }
    handleLoadingVisible(true);
    await refreshData();
    handleLoadingVisible(false);
  };

  // if (!checkEmpty(data)) {
  //   return <div className="table-container no-data">{noDataText}</div>;
  // }

  return (
    <div className="table-container">
      <LoadingOverlay visible={loadingVisible} loaderProps={{ color: 'black' }} />
      <Toolbar
        columns={datagridColumns}
        visibleColumns={visibleColumns}
        handleVisibleColumns={handleVisibleColumns}
        onRowInsert={onRowInsert}
        refreshData={handleRefreshData}
      />


      <div className="table-edit-wrapper">
        <div className="column-container column-select">
          <div className="cell column-title">
            <Checkbox
              checked={hasAllElements(
                getIndexesFromArray(filterData()),
                selectedIndexes
              )}
              disabled={!checkEmpty(filterData())}
              onChange={handleSelectAll}
              color="dark"
            />
          </div>
          {getIndexesFromArray(filterData()).map((_, index) => (
            <div className="cell" key={index}>
              <SelectComponent
                rowIndex={index}
                isChecked={selectedIndexes.includes(index)}
                selectFunc={handleSelectRow}
              />
            </div>
          ))}
        </div>
        <div className="table-content-container">
          {datagridColumns.map((column, columnIndex) =>
            visibleColumns.includes(column.caption) ? (
              <div className="column-container" key={columnIndex} style={propertyDataStyle}>
                <div className="cell column-title">
                  {column.caption}
                </div>
                {filterData().map((_, rowIndex) => (
                  <div
                    className={
                      selectedIndexes.includes(rowIndex)
                        ? `cell selected-cell ${cellCssClass}`
                        : `cell ${cellCssClass}`
                    }
                    key={rowIndex}
                  >
                    {renderColumnValue(rowIndex, column)}
                  </div>
                ))}
              </div>
            ) : null
          )}
        </div>

        {enableEdit && (
          <div className="column-container column-edit">
            <div className="cell column-title"></div>
            {getIndexesFromArray(filterData()).map((_, index) => (
              <div className="cell" key={index}>
                <EditComponent
                  datagrid={datagrid}
                  rowIndex={index}
                  onRowUpdate={onRowUpdate}
                  onRowDelete={onRowDelete}
                  onStartEdit={onStartEdit}
                />
              </div>
            ))}
          </div>
        )}
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
