import React, { useState, useEffect } from "react";
import "./gridTable.scss";
import { checkEmpty } from "../../functions/checkEmpty";
import SelectCheckbox from "../select/SelectCheckbox";
import { hasAllElements } from "../../functions/hasAllElements";
import { deepCopy } from "../../functions/deepCopy";
import { getIndexesFromArray } from "../../functions/getIndexesFromArray";
import EditComponent from "./edit/EditComponent";
import SelectComponent from "./select/SelectComponent";
import PageSizeComponent from "./pageSize/PageSizeComponent";

interface Column {
  dataField: string;
  caption: string;
  dataType: string;
  renderComponent?: React.ComponentType<any>;
}
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
  const [gridData, setGridData] = useState<object[]>([]);
  const [propertyDataStyle, setPropertyDataStyle] = useState<React.CSSProperties>({});
  const [selectedIndexes, setSelectedIndexes] = useState<number[]>([]);
  const [selectedPageSize, setSelectedPageSize] = useState<number>(pageSizes[0]);

  useEffect(() => {
    setGridData(deepCopy(data));
  }, [data]);
  useEffect(() => {
    handleTableStyle();
  }, [hasColumnLines]);

  const addToolComponents = (columns: Column[]): Column[] => {
    return [
      {
        dataField: "Select",
        caption: "",
        dataType: "action",
        renderComponent: (rowIndex: number) => (
          <SelectComponent
            rowIndex={rowIndex}
            isChecked={selectedIndexes.includes(rowIndex)}
            selectFunc={handleSelectRow}
          />
        ),
      },
      ...columns,
      // {
      //   dataField: "Edit",
      //   caption: "",
      //   dataType: "action",
      //   renderComponent: EditComponent,
      // },
    ];
  };
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
    if (hasAllElements(getIndexesFromArray(gridData), selectedIndexes)) {
      setSelectedIndexes([]);
    } else {
      setSelectedIndexes(getIndexesFromArray(gridData));
    }
  };
  const renderColumnValue = (rowIndex: number, column: Column) => {
    const value = (gridData[rowIndex] as { [key: string]: any })[column.dataField];

    // if (column.dataField === "Edit") {
    //   return <EditComponent gridData={gridData} rowIndex={rowIndex} />;
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
  const handleColumnsEmpty = (columns: Column[]): Column[] => {
    if (!checkEmpty(columns) && checkEmpty(gridData)) {
      const newColumns: Column[] = Object.keys(gridData[0]).map((dataField) => ({
        dataField,
        caption: dataField,
        dataType: typeof dataField,
      }));
      return newColumns;
      // return addToolComponents(newColumns);
    }
    return columns;
    // return addToolComponents(columns);
  };
  const handleTableStyle = () => {
    const style: React.CSSProperties = {
      borderLeft: hasColumnLines ? "1px solid #ccc" : "none",
    };
    setPropertyDataStyle(style);
  };
  const filterData = () => {
    return gridData.slice(0, selectedPageSize);
  };
  const GridColumn: React.FC<Column> = ({ dataField, caption }) => {
    if (dataField === "Select") {
      return (
        <div className="property">
          <SelectCheckbox
            selectFunc={handleSelectAll}
            selectId="ChangeAll"
            isChecked={hasAllElements(
              getIndexesFromArray(gridData),
              selectedIndexes
            )}
          />
        </div>
      );
    }
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
      {checkEmpty(data) ? (
        <>
          <div className="table-edit-wrapper">
            <div className="column-container column-select" >
              <div className="cell column-title">
                <SelectCheckbox
                  selectFunc={handleSelectAll}
                  selectId="ChangeAll"
                  isChecked={hasAllElements(
                    getIndexesFromArray(gridData),
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
              {handleColumnsEmpty(columns).map((column, columnIndex) => (
                <div
                  className="column-container"
                  key={columnIndex}
                  style={propertyDataStyle}
                >
                  <div className="cell column-title">
                    <GridColumn {...column} />
                  </div>
                  {filterData().map((_, rowIndex) => (
                    <div className={`cell ${cellCssClass}`} key={rowIndex}>
                      {renderColumnValue(rowIndex, column)}
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <div className="column-container column-edit">
              <div className="cell column-title"></div>
              {getIndexesFromArray(filterData()).map((_, index) => (
                <div className="cell" key={index}>
                  <EditComponent gridData={gridData} rowIndex={index} key={index} />
                </div>
              ))}
            </div>
          </div>
          <div className="page-end-container">
            <PageSizeComponent
              showPageSize={showPageSize}
              showPageSizeInfo={showPageSizeInfo}
              showPageSizeSelector={showPageSizeSelector}
              allItemsCount={gridData.length}
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
