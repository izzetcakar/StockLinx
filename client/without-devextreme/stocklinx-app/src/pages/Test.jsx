import React from "react";
import "./test.scss";
import { checkEmpty } from "../functions/checkEmpty";

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
function titleComponent(value) {
  return <div style={{ fontWeight: "bold" }}>{value}</div>;
}
function appComponent(value) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
      }}
    >
      {value}
    </div>
  );
}
const Test = () => {
  const columns = [
    {
      dataField: "Owner",
      caption: "Owner",
      dataType: "string",
      renderComponent: titleComponent,
    },
    { dataField: "LastCheck", caption: "Last Check", dataType: "string" },
    { dataField: "OSversion", caption: "OS Version", dataType: "string" },
    {
      dataField: "PasswordManager",
      caption: "Password Manager",
      dataType: "boolean",
    },
    { dataField: "HDencrypted", caption: "HD Encrypted", dataType: "boolean" },
    { dataField: "AVinstalled", caption: "AV Installed", dataType: "boolean" },
    {
      dataField: "Apllications",
      caption: "Apllications",
      dataType: "number",
      renderComponent: appComponent,
    },
    {
      dataField: "Edit",
      caption: "",
      dataType: "action",
      renderComponent: EditRenderComponent,
    },
  ];

  const data = [
    {
      Owner: "Madison Carter",
      LastCheck: null,
      OSversion: "Mac OS X 10.14.4",
      PasswordManager: true,
      HDencrypted: true,
      AVinstalled: true,
      Apllications: 675,
    },
    {
      Owner: "Madison Carter",
      LastCheck: "2 hours ago",
      OSversion: "Mac OS X 10.16",
      PasswordManager: false,
      HDencrypted: true,
      AVinstalled: true,
      Apllications: 275,
    },
    {
      Owner: "Madison Carter",
      LastCheck: "3 hours ago",
      OSversion: "Mac OS X 10.16",
      PasswordManager: false,
      HDencrypted: true,
      AVinstalled: true,
      Apllications: 265,
    },
  ];

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
      return Object.keys(data[0]).map((dataField) => ({
        dataField,
        caption: dataField,
        dataType: (typeof dataField).toString(),
        renderComponent: null,
      }));
    }
    return columns;
  };
  return (
    <div className="page-data">
      <div className="title">Computers</div>
      <div className="description">Description</div>
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
    </div>
  );
};

export default Test;
