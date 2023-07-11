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

const GridTable = ({
  data = [],
  columns = [],
  hasColumnLines = false,
  showPageSizeSelector = true,
  showPageSizeInfo = true,
  showPageSize = true,
  noDataText = "No Data to Display",
  pageSizes = [1, 3, 5],
}) => {
  const [gridData, setGridData] = useState([]);
  const [propertyDataStyle, setPropertyDataStyle] = useState({});
  const [selectedIndexes, setSelectedIndexes] = useState([]);
  const [selectedPageSize, setSelectedPageSize] = useState(pageSizes[0]);

  useEffect(() => {
    setGridData(deepCopy(data));
  }, [data]);

  useEffect(() => {
    handleTableStyle();
  }, [hasColumnLines]);

  const addToolComponents = (columns) => {
    return [
      {
        dataField: "Select",
        caption: "",
        dataType: "action",
        renderComponent: (rowIndex) => (
          <SelectComponent
            rowIndex={rowIndex}
            isChecked={selectedIndexes.includes(rowIndex)}
            selectFunc={handleSelectRow}
          />
        ),
      },
      ...columns,
      {
        dataField: "Edit",
        caption: "",
        dataType: "action",
        renderComponent: EditComponent,
      },
    ];
  };

  const handleSelectRow = (index) => {
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
  const renderColumnValue = (rowIndex, column) => {
    const value = gridData[rowIndex][column.dataField];

    if (column.dataField === "Edit") {
      return <EditComponent rowIndex={rowIndex} />;
    }
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
      return column.renderComponent(value);
    }
    if (value === null || value === undefined) {
      return "";
    }
    if (typeof value === "boolean") {
      const name = value ? "check" : "x";
      const color = value ? "#63bd4f" : "#ed6b6b";
      return <box-icon size="1.5rem" name={name} color={color} />;
    }
    return value;
  };
  const handleColumnsEmpty = (columns) => {
    if (!checkEmpty(columns) && checkEmpty(gridData)) {
      const newColumns = Object.keys(gridData[0]).map((dataField) => ({
        dataField,
        caption: dataField,
        dataType: typeof dataField,
        renderComponent: null,
      }));

      return addToolComponents(newColumns);
    }

    return addToolComponents(columns);
  };
  const handleTableStyle = () => {
    const style = {
      borderRight: hasColumnLines ? "1px solid #ccc" : "none",
    };
    setPropertyDataStyle(style);
  };
  const filterData = () => {
    return gridData.slice(0, selectedPageSize);
  };
  const GridColumn = ({ dataField, caption }) => {
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

    return <div className="property">{caption}</div>;
  };

  const handleSelectedPageSize = (newSize) => {
    setSelectedPageSize(newSize);
    setSelectedIndexes([]);
  };

  return (
    <div
      className={
        checkEmpty(data) ? "table-container" : "table-container no-data"
      }
    >
      {checkEmpty(data) ? (
        <>
          <div className="columns-data-container">
            {handleColumnsEmpty(columns).map((column, columnIndex) => (
              <div
                className="property-data"
                key={columnIndex}
                style={
                  column.dataField === "Edit" && hasColumnLines
                    ? { ...propertyDataStyle, borderLeft: "0" }
                    : propertyDataStyle
                }
              >
                <GridColumn {...column} />
                {filterData().map((_, rowIndex) => (
                  <div className="data-value" key={rowIndex}>
                    {renderColumnValue(rowIndex, column)}
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div className="page-end-container">
            <PageSizeComponent
              showPageSize={showPageSize}
              showPageSizeInfo={showPageSizeInfo}
              showPageSizeSelector={showPageSizeSelector}
              allItemsCount={gridData.length}
              handleSelectedPageSize={handleSelectedPageSize}
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
