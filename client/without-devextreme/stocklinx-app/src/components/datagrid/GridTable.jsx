import React, { useState, useEffect } from "react";
import "./gridTable.scss";
import { checkEmpty } from "../../functions/checkEmpty";
import SelectCheckbox from "../select/SelectCheckbox";

const GridTable = ({ data, columns, hasColumnLines }) => {
  const [propertyDataStyle, setPropertyDataStyle] = useState({});
  const [selectedIndexes, setSelectedIndexes] = useState([]);

  useEffect(() => {
    handleTableStyle();
  }, [hasColumnLines]);

  const Column = ({ dataField, caption, dataType }) => {
    return (
      <div className="property">
        {dataField === "Select" ? (
          <SelectCheckbox
            selectFunc={() => handleSelectAll()}
            selectId={"ChangeAll"}
            isChecked={checkEmpty(selectedIndexes)}
          />
        ) : (
          caption
        )}
      </div>
    );
  };

  const EditObjectComponent = (rowIndex) => {
    return (
      <div className="edit-container">
        <div className="element" onClick={() => console.log(data[rowIndex])}>
          <box-icon type="solid" name="edit-alt" size="1.5rem"></box-icon>
        </div>
        <div className="element" onClick={() => console.log(rowIndex)}>
          <box-icon type="solid" name="x-square" size="1.5rem"></box-icon>
        </div>
      </div>
    );
  };
  const SelectObjectComponent = (rowIndex) => {
    return (
      <SelectCheckbox
        selectFunc={() => selectObject(rowIndex)}
        selectId={rowIndex}
        isChecked={selectedIndexes.includes(rowIndex)}
      />
    );
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
    if (checkEmpty(selectedIndexes)) {
      setSelectedIndexes([]);
    } else {
      setSelectedIndexes(columns.map((_, index) => index));
    }
  };
  const renderValue = (rowIndex, column) => {
    const value = data[rowIndex][column.dataField];

    if (column.dataField === "Edit") {
      return EditObjectComponent(rowIndex);
    }
    if (column.dataField === "Select") {
      return SelectObjectComponent(rowIndex);
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
      return <box-icon size="1.5rem" name={name} color={color}></box-icon>;
    }

    return value;
  };
  const ColumnsEmptyHandler = (columns, data) => {
    if (!checkEmpty(columns) && checkEmpty(data)) {
      let newColumns = Object.keys(data[0]).map((dataField) => ({
        dataField,
        caption: dataField,
        dataType: (typeof dataField).toString(),
        renderComponent: null,
      }));
      return AddToolComponents(newColumns);
    }
    return AddToolComponents(columns);
  };
  const AddToolComponents = (columns) => {
    return [
      {
        dataField: "Select",
        caption: "",
        dataType: "action",
        renderComponent: SelectObjectComponent,
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

  const handleTableStyle = () => {
    const style = {};
    if (hasColumnLines) {
      style.borderRight = "1px solid #ccc";
    }
    setPropertyDataStyle(style);
  };

  return (
    <div className="table-container">
      <div className="columns-data-container">
        {ColumnsEmptyHandler(columns, data).map((column, columnIndex) => (
          <div
            className="property-data"
            key={columnIndex}
            style={
              column.dataField === "Edit" && hasColumnLines
                ? { ...propertyDataStyle, borderLeft: "0" }
                : propertyDataStyle
            }
          >
            <Column {...column} />
            {data.map((_, rowIndex) => (
              <div className="data-value" key={rowIndex}>
                {renderValue(rowIndex, column)}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GridTable;
