import React from "react";
import Gridtable from "../../components/gridTable/Gridtable";
import { Column } from "../../components/gridTable/interfaces/interfaces";

interface ExcelTableProps {
  data: object[];
  columns: Column[];
}
const ExcelTable: React.FC<ExcelTableProps> = ({ data, columns }) => {
  return (
    <Gridtable
      data={data}
      itemKey="id"
      columns={columns}
      enableExcelActions={false}
      enableEditActions={false}
      enableSelectActions={false}
    />
  );
};

export default ExcelTable;
