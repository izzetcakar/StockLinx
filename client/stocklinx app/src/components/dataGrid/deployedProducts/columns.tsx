import { BaseColumn } from "../../gridTable/interfaces/interfaces";
import { IDeployedProductDto } from "../../../interfaces/interfaces";
import { Anchor } from "@mantine/core";
import { useNavigate } from "react-router-dom";

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
        const route = (e as IDeployedProductDto)?.productRoute;
        return (
          <Anchor onClick={() => navigate(route ? route : "")}>
            {(e as IDeployedProductDto).productName}
          </Anchor>
        );
      },
    },
    {
      dataField: "productDescription",
      caption: "Description",
      dataType: "string",
    },
    {
      dataField: "assignDate",
      caption: "Assigned Date",
      dataType: "date",
    },
  ];

  return columns;
};
