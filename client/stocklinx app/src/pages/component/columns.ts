import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import {
  Column,
  ExcelColumn,
} from "../../components/gridTable/interfaces/interfaces";

export const useColumns = () => {
  const branches = useSelector((state: RootState) => state.branch.branches);
  const locations = useSelector((state: RootState) => state.location.locations);
  const categories = useSelector(
    (state: RootState) => state.category.categories
  );

  const columns: Column[] = [
    {
      caption: "Name",
      dataField: "name",
      dataType: "string",
    },
    {
      caption: "Serial",
      dataField: "serialNo",
      dataType: "string",
    },
    {
      caption: "Category",
      dataField: "categoryId",
      lookup: {
        dataSource: categories,
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
    {
      caption: "Avail",
      dataField: "availableQuantity",
      dataType: "number",
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
      caption: "Order Number",
      dataField: "orderNo",
      dataType: "string",
    },
    {
      caption: "Purchase Date",
      dataField: "purchaseDate",
      dataType: "date",
    },
    {
      caption: "Purchase Cost",
      dataField: "purchaseCost",
      dataType: "number",
    },
    // INVISIBLE COLUMNS
    {
      caption: "Branch",
      dataField: "branchId",
      lookup: {
        dataSource: branches,
        valueExpr: "id",
        displayExpr: "name",
      },
      dataType: "string",
      visible: false,
    },
    {
      dataField: "imagePath",
      caption: "Image",
      dataType: "string",
      visible: false,
    },
    {
      caption: "Notes",
      dataField: "notes",
      dataType: "string",
    },
  ];

  const excelColumns: ExcelColumn[] = [
    {
      dataField: "branchId",
      validate(value) {
        return value !== null;
      },
      errorText: "Branch is required",
    },
    {
      dataField: "name",
      validate(value) {
        return value !== null;
      },
      errorText: "Name is required",
    },
    {
      dataField: "serialNo",
    },
    {
      dataField: "categoryId",
      validate(value) {
        return value !== null;
      },
      errorText: "Category is required",
    },
    {
      dataField: "quantity",
      validate(value) {
        if (value === null || value < 0) return false;
        return true;
      },
      errorText: "Quantity must be a positive number",
    },
    {
      dataField: "orderNo",
    },
    {
      dataField: "purchaseDate",
    },
    {
      dataField: "purchaseCost",
      validate(value) {
        if (value !== null && value < 0) {
          return false;
        }
        return true;
      },
      errorText: "Purchase Cost must be a positive number",
    },
    {
      dataField: "imagePath",
    },
    {
      dataField: "notes",
    },
  ];
  return { columns, excelColumns };
};
