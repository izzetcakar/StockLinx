import React, { useState, useEffect, useCallback } from "react";
import "./gridTable.scss";
import { checkEmpty } from "../../functions/checkEmpty";
import SelectCheckbox from "../select/SelectCheckbox";
import { hasAllElements } from "../../functions/hasAllElements";
import { deepCopy } from "../../functions/deepCopy";
import { getIndexesFromArray } from "../../functions/getIndexesFromArray";
import EditComponent from "./edit/EditComponent";
import SelectComponent from "./select/SelectComponent";
import PageSizeComponent from "./pageSize/PageSizeComponent";
import Toolbar from "./toolbar/Toolbar";
import { Column } from "./interfaces/interfaces";

interface GridTableProps {
  data?: object[];
  columns?: Column[];
  hasColumnLines?: boolean;
  showPageSizeSelector?: boolean;
  showPageSizeInfo?: boolean;
  showPageSize?: boolean;
  noDataText?: string;
  pageSizes?: number[];
  gridCssClass?: string;
  cellCssClass?: string;
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
  gridCssClass = "",
  cellCssClass = ""
}) => {
  const [datagridColumns, setDatagridColumns] = useState<Column[]>(columns);
  const [visibleColumns, setVisibleColumns] = useState<string[]>([]);
  const [datagrid, setDatagrid] = useState<object[]>([]);
  const [propertyDataStyle, setPropertyDataStyle] = useState<React.CSSProperties>({});
  const [selectedIndexes, setSelectedIndexes] = useState<number[]>([]);
  const [selectedPageSize, setSelectedPageSize] = useState<number>(pageSizes[0]);

  useEffect(() => {
    setDatagrid(deepCopy(data));
  }, [data]);
  useEffect(() => {
    handleTableStyle();
  }, [hasColumnLines]);
  useEffect(() => {
    setDatagridColumns(handleColumnsEmpty(columns));
  }, [columns]);
  useEffect(() => {
    setVisibleColumns(setVisibleColumnsToAll());
  }, [columns]);

  const handleVisibleColumns = (columnCaption: string): void => {
    if (visibleColumns.includes(columnCaption)) {
      setVisibleColumns(visibleColumns.filter((item) => item !== columnCaption));
    } else {
      setVisibleColumns([...visibleColumns, columnCaption]);
    }
  };
  const setVisibleColumnsToAll = useCallback(() => {
    return columns.map((item) => item.caption);
  }, [columns]);

  const handleSelectRow = (index: number) => {
    setSelectedIndexes((prevIndexes) => {
      if (prevIndexes.includes(index)) {
        return prevIndexes.filter((i) => i !== index);
      } else {
        return [...prevIndexes, index];
      }
    });
  };
  const handleSelectAll = () => {
    if (hasAllElements(getIndexesFromArray(datagrid), selectedIndexes)) {
      setSelectedIndexes([]);
    } else {
      setSelectedIndexes(getIndexesFromArray(datagrid));
    }
  };
  const renderColumnValue = (rowIndex: number, column: Column) => {
    const value = (datagrid[rowIndex] as { [key: string]: any })[column.dataField];

    // if (column.dataField === "Edit") {
    //   return <EditComponent datagrid={datagrid} rowIndex={rowIndex} />;
    // }
    if (column.dataField === "Select") {
      return (
        <SelectComponent
          rowIndex={rowIndex}
          isChecked={selectedIndexes.includes(rowIndex)}
          selectFunc={handleSelectRow}
        />
      );
    }

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
  const handleColumnsEmpty = useCallback((columns: Column[]): Column[] => {
    if (!checkEmpty(columns) && checkEmpty(datagrid)) {
      const newColumns: Column[] = Object.keys(datagrid[0]).map((dataField) => ({
        dataField,
        caption: dataField,
        dataType: typeof dataField,
      }));
      setVisibleColumns(newColumns.map((column) => column.caption));
      return newColumns;
    }
    setVisibleColumns(columns.map((column) => column.caption));
    return columns;
  }, [columns, datagrid]);
  const handleTableStyle = () => {
    const style: React.CSSProperties = {
      borderLeft: hasColumnLines ? "1px solid #ccc" : "none",
    };
    setPropertyDataStyle(style);
  };
  const filterData = () => {
    return datagrid.slice(0, selectedPageSize);
  };
  const GridColumn: React.FC<Column> = ({ dataField, caption }) => {
    return caption;
  };

  const handleSelectedPageSize = (newSize: number) => {
    setSelectedPageSize(newSize);
    setSelectedIndexes([]);
  };

  return (
    <div
      className={
        checkEmpty(data) ? `table-container ${gridCssClass}` : "table-container no-data"
      }
    >
      <Toolbar
        columns={datagridColumns}
        visibleColumns={visibleColumns}
        handleVisibleColumns={handleVisibleColumns}
      />
      {checkEmpty(data) ? (
        <>
          <div className="table-edit-wrapper">
            <div className="column-container column-select" >
              <div className="cell column-title">
                <SelectCheckbox
                  selectFunc={handleSelectAll}
                  selectId="ChangeAll"
                  isChecked={hasAllElements(
                    getIndexesFromArray(filterData()),
                    selectedIndexes
                  )}
                />
              </div>
              {getIndexesFromArray(filterData()).map((_, index) => (
                <div className="cell" key={index} >
                  <SelectComponent
                    rowIndex={index}
                    isChecked={selectedIndexes.includes(index)}
                    selectFunc={handleSelectRow}
                  />
                </div>
              ))}
            </div>
            <div className="table-content-container">
              {datagridColumns.map((column, columnIndex) => (visibleColumns.includes(column.caption) ?
                (
                  <div
                    className="column-container"
                    key={columnIndex}
                    style={propertyDataStyle}
                  >
                    <div className="cell column-title">
                      <GridColumn {...column} />
                    </div>
                    {filterData().map((_, rowIndex) => (
                      <div className={selectedIndexes.includes(rowIndex) ?
                        `cell selected-cell ${cellCssClass}` : `cell ${cellCssClass}`} key={rowIndex}>
                        {renderColumnValue(rowIndex, column)}
                      </div>
                    ))}
                  </div>
                ) : null
              ))}
            </div>
            <div className="column-container column-edit">
              <div className="cell column-title"></div>
              {getIndexesFromArray(filterData()).map((_, index) => (
                <div className="cell" key={index}>
                  <EditComponent datagrid={datagrid} rowIndex={index} key={index} />
                </div>
              ))}
            </div>
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
        </>
      ) : (
        <div>{noDataText}</div>
      )}
    </div>
  );
};

export default GridTable;
