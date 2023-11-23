import { ProductStatusType } from "../../interfaces/interfaces";
import { createDataFromEnum } from "../../functions/createDataFromEnum";
import {
  Column,
  ExcelColumn,
} from "../../components/gridTable/interfaces/interfaces";

export const useColumns = () => {
  const columns: Column[] = [
    {
      dataField: "name",
      caption: "Name",
      dataType: "string",
    },
    {
      dataField: "type",
      caption: "Type",
      lookup: {
        dataSource: createDataFromEnum(ProductStatusType),
        valueExpr: "value",
        displayExpr: "id",
      },
      dataType: "number",
    },
  ];

  const excelColumns: ExcelColumn[] = [
    {
      caption: "Name",
      validate(value) {
        return value !== null;
      },
      errorText: "Name is required",
    },
    {
      caption: "Type",
      validate(value) {
        return value !== null;
      },
      errorText: "Type is required",
    },
  ];

  return { columns, excelColumns };
};
