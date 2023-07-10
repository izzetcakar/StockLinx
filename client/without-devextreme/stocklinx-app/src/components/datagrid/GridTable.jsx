import React, { useState, useEffect } from "react";
import "./gridTable.scss";
import { checkEmpty } from "../../functions/checkEmpty";
import SelectCheckbox from "../select/SelectCheckbox";
import { hasAllElements } from "../../functions/hasAllElements";
import { deepCopy } from "../../functions/deepCopy";
import { getIndexesFromArray } from "../../functions/getIndexesFromArray";

const pageSizes = [1, 3, 5];

const GridTable = ({
  data,
  columns,
  hasColumnLines = false,
  showPageSizeSelector = true,
  showPageSizeInfo = true,
  showPageSize = true,
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

  const EditObjectComponent = ({ rowIndex }) => {
    return (
      <div className="edit-container">
        <div
          className="element"
          onClick={() => console.log(gridData[rowIndex])}
        >
          <box-icon type="solid" name="edit-alt" size="1.5rem" />
        </div>
        <div className="element" onClick={() => console.log(rowIndex)}>
          <box-icon type="solid" name="x-square" size="1.5rem" />
        </div>
      </div>
    );
  };
  const SelectObjectComponent = ({ rowIndex, isChecked, selectFunc }) => {
    return (
      <SelectCheckbox
        selectFunc={() => selectFunc(rowIndex)}
        selectId={rowIndex}
        isChecked={isChecked}
      />
    );
  };
  const PageSizeComponent = () => {
    if (!showPageSizeSelector && !showPageSizeInfo) {
      return null;
    }
    return (
      <div className="page-size-container">
        {showPageSizeSelector ? (
          <div className="size-container">
            {pageSizes.map((item) => (
              <div
                className={`size ${
                  item === selectedPageSize ? "selected" : ""
                }`}
                key={item}
                onClick={() => setSelectedPageSize(item)}
              >
                {item}
              </div>
            ))}
          </div>
        ) : null}

        {showPageSizeInfo ? (
          <div className="selected-count-container">
            Page {selectedIndexes.length} of{" "}
            {Math.min(selectedPageSize, gridData.length)} (
            {selectedIndexes.length} items)
          </div>
        ) : null}
      </div>
    );
  };
  const addToolComponents = (columns) => {
    return [
      {
        dataField: "Select",
        caption: "",
        dataType: "action",
        renderComponent: (rowIndex) => (
          <SelectObjectComponent
            rowIndex={rowIndex}
            isChecked={selectedIndexes.includes(rowIndex)}
            selectFunc={selectObject}
          />
        ),
      },
      ...columns,
      {
        dataField: "Edit",
        caption: "",
        dataType: "action",
        renderComponent: EditObjectComponent,
      },
    ];
  };
  const selectObject = (index) => {
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
  const renderValue = (rowIndex, column) => {
    const value = gridData[rowIndex][column.dataField];

    if (column.dataField === "Edit") {
      return <EditObjectComponent rowIndex={rowIndex} />;
    }

    if (column.dataField === "Select") {
      return (
        <SelectObjectComponent
          rowIndex={rowIndex}
          isChecked={selectedIndexes.includes(rowIndex)}
          selectFunc={selectObject}
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

  return (
    <div className="table-container">
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
                {renderValue(rowIndex, column)}
              </div>
            ))}
          </div>
        ))}
      </div>
      {showPageSize ? <PageSizeComponent /> : null}
    </div>
  );
};

export default GridTable;
