import { BaseColumn } from "../../gridTable/interfaces/interfaces";
import { Anchor } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { IUserProductDto } from "../../../interfaces/dtos";

export const useColumns = () => {
  const navigate = useNavigate();

  const columns: BaseColumn[] = [
    {
      dataField: "productType",
      caption: "Product Type",
      dataType: "string",
    },
    {
      dataField: "productName",
      caption: "Name",
      dataType: "string",
      renderComponent(e) {
        const route = (e as IUserProductDto)?.productRoute;
        return (
          <Anchor onClick={() => navigate(route ? route : "")}>
            {(e as IUserProductDto).productName}
          </Anchor>
        );
      },
    },
    {
      dataField: "quantity",
      caption: "Quantity",
      dataType: "number",
    },
    {
      dataField: "assignDate",
      caption: "Assigned Date",
      dataType: "date",
    },
  ];

  return columns;
};
