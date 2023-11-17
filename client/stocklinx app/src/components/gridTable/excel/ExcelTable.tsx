import React from "react";
import Gridtable from "../Gridtable";
import {
  Column,
  RowError,
} from "../interfaces/interfaces";

interface ExcelTableProps {
  data: object[];
  columns: Column[];
  errors: RowError[];
}
const ExcelTable: React.FC<ExcelTableProps> = ({ data, columns, errors }) => {
  const errorColumns: Column[] = [
    {
      dataField: "row",
      caption: "Row",
      dataType: "number",
    },
    {
      dataField: "column",
      caption: "Column",
      dataType: "string",
      lookup: {
        dataSource: columns,
        valueExpr: "dataField",
        displayExpr: "caption",
      },
    },
    {
      dataField: "error",
      caption: "Error",
      dataType: "string",
    },
  ];

  return (
    <div
      style={{
        display: "flex",
        gap: "1rem",
        maxHeight: "80dvh",
        maxWidth: "80dvw",
      }}
    >
      <Gridtable data={data} itemKey="id" columns={columns} />
      <Gridtable data={errors} itemKey="id" columns={errorColumns} />
    </div>
  );
};

export default ExcelTable;
