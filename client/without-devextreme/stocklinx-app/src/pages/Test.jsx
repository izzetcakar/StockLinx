import React, { useState } from "react";
import "./test.scss";
import GridTable from "../components/gridTable/GridTable";

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
  const [options, setOptions] = useState([
    {
      option: "hasColumnLines",
      value: false,
    },
    {
      option: "showPageSize",
      value: true,
    },
    {
      option: "showPageSizeSelector",
      value: true,
    },
    {
      option: "showPageSizeInfo",
      value: true,
    },
  ]);
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
  const handleOptions = (target) => {
    let newOptions = [...options].map((item, index) => {
      if (index === target) {
        return { ...item, value: !item.value };
      } else {
        return item;
      }
    });
    setOptions(newOptions);
  };
  return (
    <div className="page-data">
      <div className="title">Computers</div>
      <div className="description">Description</div>
      <GridTable
        data={data}
        columns={columns}
        hasColumnLines={options[0].value}
        showPageSize={options[1].value}
        showPageSizeSelector={options[2].value}
        showPageSizeInfo={options[3].value}
      />
      <div
        className="button-container"
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        {options.map((item, index) => (
          <button
            key={index}
            onClick={() => handleOptions(index)}
            style={{
              width: "220px",
            }}
          >
            {item.option} - {item.value.toString()}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Test;
