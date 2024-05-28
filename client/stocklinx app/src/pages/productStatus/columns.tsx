import { IProductStatus, ProductStatusType } from "../../interfaces/serverInterfaces";
import { createDataFromEnum } from "../../utils/createDataFromEnum";
import {
  BaseColumn,
  ExcelColumn,
} from "@interfaces/gridTableInterfaces";
import { useNavigate } from "react-router-dom";
import { Anchor } from "@mantine/core";

export const useColumns = () => {
  const navigate = useNavigate();

  const columns: BaseColumn[] = [
    {
      dataField: "name",
      caption: "Name",
      dataType: "string",
      renderComponent(e) {
        return (
          <Anchor
            onClick={() =>
              navigate(`/productStatus/${(e as IProductStatus)?.id}`)
            }
            target="_blank"
            underline="always"
          >
            {(e as IProductStatus).name}
          </Anchor>
        );
      },
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
