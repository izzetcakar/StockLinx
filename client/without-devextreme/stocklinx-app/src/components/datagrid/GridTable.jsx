import React from "react";
import "./gridTable.scss";
import { checkEmpty } from "../../functions/checkEmpty";

const Column = ({ dataField, caption, dataType }) => {
  return <div className="property">{caption}</div>;
};
const EditRenderComponent = () => {
  return (
    <div className="edit-container">
      <div className="element">
        <box-icon type="solid" name="edit-alt" size="1.5rem"></box-icon>
      </div>
      <div className="element">
        <box-icon type="solid" name="x-square" size="1.5rem"></box-icon>
      </div>
    </div>
  );
};
const GridTable = ({ data, columns }) => {
  const renderValue = (rowIndex, column) => {
    if (column.renderComponent) {
      const value = data[rowIndex][column.dataField];
      return column.renderComponent(value);
    }
    const value = data[rowIndex][column.dataField];
    if (value === null || value === undefined) {
      return "";
    }
    if (typeof value === "boolean") {
      let name = value ? "check" : "x";
      let color = value ? "#63bd4f" : "#ed6b6b";
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
      return AddEditToColumns(newColumns);
    }
    return AddEditToColumns(columns);
  };
  const AddEditToColumns = (columns) => {
    return [
      ...columns,
      {
        dataField: "Edit",
        caption: "",
        dataType: "action",
        renderComponent: EditRenderComponent,
      },
    ];
  };
  return (
    <div className="table-container">
      <div className="columns-data-container">
        {ColumnsEmptyHandler(columns, data).map((column, columnIndex) => (
          <div className="property-data" key={columnIndex}>
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
