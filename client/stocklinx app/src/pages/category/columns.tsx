import { CategoryType, ICategory } from "@interfaces/serverInterfaces";
import {
  BaseColumn,
  ExcelColumn,
} from "@interfaces/gridTableInterfaces";
import { Anchor } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { createDataFromEnum } from "../../utils/createDataFromEnum";

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
            onClick={() => navigate(`/category/${(e as ICategory)?.id}`)}
            target="_blank"
            underline="always"
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
        data: createDataFromEnum(CategoryType),
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
