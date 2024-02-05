import { CategoryType, ICategory } from "../../interfaces/interfaces";
import {
  BaseColumn,
  ExcelColumn,
} from "../../components/gridTable/interfaces/interfaces";
import { Anchor } from "@mantine/core";
import { useNavigate } from "react-router-dom";

export const useColumns = () => {
  const navigate = useNavigate();
  const productTypes = [
    { id: CategoryType.ASSET, name: "Asset" },
    { id: CategoryType.LICENSE, name: "License" },
    { id: CategoryType.ACCESSORY, name: "Accessory" },
    { id: CategoryType.CONSUMABLE, name: "Consumable" },
    { id: CategoryType.COMPONENT, name: "Component" },
  ];

  const columns: BaseColumn[] = [
    {
      dataField: "name",
      caption: "Name",
      dataType: "string",
      renderComponent(e) {
        return (
          <Anchor
            onClick={() => navigate(`/category/${(e as ICategory)?.id}`)}
            target="_blank"
            underline={true}
          >
            {(e as ICategory).name}
          </Anchor>
        );
      },
    },
    {
      dataField: "type",
      caption: "Type",
      lookup: {
        defaultData: productTypes,
        valueExpr: "id",
        displayExpr: "name",
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
    },
  ];

  return { columns, excelColumns };
};
