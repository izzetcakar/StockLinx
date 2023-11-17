import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import {
  ExcelColumn,
  Column as MyColumn,
} from "../../components/gridTable/interfaces/interfaces";

export const useColumns = () => {
  const locations = useSelector((state: RootState) => state.location.locations);
  const categories = useSelector(
    (state: RootState) => state.category.categories
  );

  const columns: MyColumn[] = [
    {
      caption: "Name",
      dataField: "name",
      dataType: "string",
    },
    {
      caption: "Category",
      dataField: "categoryId",
      dataType: "string",
      lookup: {
        dataSource: categories,
        valueExpr: "id",
        displayExpr: "name",
      },
    },
    {
      caption: "Model",
      dataField: "modelNo",
      dataType: "string",
    },
    {
      caption: "Location",
      dataField: "locationId",
      lookup: {
        dataSource: locations,
        valueExpr: "id",
        displayExpr: "name",
      },
      dataType: "string",
    },
    {
      caption: "Total",
      dataField: "quantity",
      dataType: "number",
    },
    // ADD TOTAL QUANTITY
    // ADD AVAILABLE QUANTITY
    {
      dataField: "purchaseCost",
      caption: "Purchase Cost",
      dataType: "number",
    },
  ];

  const excelColumns: ExcelColumn[] = [
    {
      dataField: "name",
      validate(value) {
        return value !== null;
      },
      errorText: "Name cannot be empty",
    },
    {
      dataField: "category",
    },
    {
      dataField: "model",
    },
    {
      dataField: "location",
    },
    {
      dataField: "quantity",
    },
    {
      dataField: "purchaseCost",
    },
  ];

  return { columns, excelColumns };
};
