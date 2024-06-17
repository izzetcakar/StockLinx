import { ProductStatusType } from "@interfaces/serverInterfaces";
import { createDataFromEnum } from "../../utils/enumUtils";
import { DataColumn } from "@interfaces/gridTableInterfaces";

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
        data: createDataFromEnum(ProductStatusType),
      },
      dataType: "number",
    },
  ];

  return { columns };
};
