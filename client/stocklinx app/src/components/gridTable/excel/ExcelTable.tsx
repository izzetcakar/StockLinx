import React from "react";
import Gridtable from "../GridTableContent";
import { DataColumn, RowError } from "@interfaces/gridTableInterfaces";

interface ExcelTableProps {
  data: object[];
  columns: DataColumn[];
  errors: RowError[];
}
const ExcelTable: React.FC<ExcelTableProps> = ({ data, columns, errors }) => {
  const errorColumns: DataColumn[] = [
    {
      dataField: "row",
      caption: "Row",
      dataType: "number",
    },
    {
      dataField: "column",
      caption: "Column",
      dataType: "string",
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
      <div style={{ maxWidth: "50%" }}>
        <Gridtable data={data} itemKey="id" columns={columns} />
      </div>
      <Gridtable data={errors} itemKey="id" columns={errorColumns} />
    </div>
  );
};

export default ExcelTable;
