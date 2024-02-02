import { IProductStatus, ProductStatusType } from "../../interfaces/interfaces";
import { createDataFromEnum } from "../../functions/createDataFromEnum";
import {
  BaseColumn,
  ExcelColumn,
} from "../../components/gridTable/interfaces/interfaces";
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
            underline={true}
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
