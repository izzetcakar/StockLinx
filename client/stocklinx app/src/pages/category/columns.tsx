import { CategoryType } from "@interfaces/serverInterfaces";
import { DataColumn } from "@interfaces/gridTableInterfaces";
import { createDataFromEnum } from "../../utils/enumUtils";

export const useColumns = () => {
  const columns: DataColumn[] = [
    {
      dataField: "name",
      caption: "Name",
      dataType: "string",
    },
    {
      dataField: "type",
      caption: "Type",
      lookup: {
        data: createDataFromEnum(CategoryType),
      },
      dataType: "number",
    },
  ];

  return { columns };
};
