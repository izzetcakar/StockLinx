import { DataColumn } from "@interfaces/gridTableInterfaces";
import { Anchor } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { UserProductDto } from "../../../interfaces/dtos";

export const useColumns = () => {
  const navigate = useNavigate();

  const columns: DataColumn[] = [
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
        const route = (e as UserProductDto)?.productRoute;
        return (
          <Anchor onClick={() => navigate(route ? route : "")}>
            {(e as UserProductDto).productName}
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
