import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import {
  ExcelColumn,
  Column,
} from "../../components/gridTable/interfaces/interfaces";
import { CategoryType } from "../../interfaces/interfaces";

export const useColumns = () => {
  const branches = useSelector((state: RootState) => state.branch.branches);
  const locations = useSelector((state: RootState) => state.location.locations);
  const manufacturers = useSelector(
    (state: RootState) => state.manufacturer.manufacturers
  );
  const suppliers = useSelector((state: RootState) => state.supplier.suppliers);
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
      caption: "Category",
      dataField: "categoryId",
      dataType: "string",
      lookup: {
        dataSource: categories.filter(
          (category) => category.type === CategoryType.ACCESSORY
        ),
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
    {
      caption: "Avail",
      dataField: "availableQuantity",
      dataType: "number",
    },
    {
      dataField: "purchaseCost",
      caption: "Purchase Cost",
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
      caption: "Order No",
      dataField: "orderNo",
      dataType: "string",
      visible: false,
    },
    {
      caption: "Purchase Date",
      dataField: "purchaseDate",
      dataType: "date",
      visible: false,
    },
    {
      caption: "Notes",
      dataField: "notes",
      dataType: "string",
      visible: false,
    },
    {
      caption: "Manufacturer",
      dataField: "manufacturerId",
      lookup: {
        dataSource: manufacturers,
        valueExpr: "id",
        displayExpr: "name",
      },
      dataType: "string",
      visible: false,
    },
    {
      caption: "Supplier",
      dataField: "supplierId",
      lookup: {
        dataSource: suppliers,
        valueExpr: "id",
        displayExpr: "name",
      },
      dataType: "string",
      visible: false,
    },
    {
      caption: "Warranty",
      dataField: "warrantyDate",
      dataType: "date",
      visible: false,
    },
    {
      caption: "Serial No",
      dataField: "serialNo",
      dataType: "string",
      visible: false,
    },
    {
      caption: "Image",
      dataField: "imagePath",
      dataType: "string",
      visible: false,
    },
  ];

  const excelColumns: ExcelColumn[] = [
    {
      caption: "Branch",
      validate(value) {
        return value !== null;
      },
      errorText: "Branch is required",
    },
    {
      caption: "Name",
      validate(value) {
        return value !== null;
      },
      errorText: "Name is required",
    },
    {
      caption: "Category",
      validate(value) {
        return value !== null;
      },
      errorText: "Category is required",
    },
    {
      caption: "Model",
      validate(value) {
        return value !== null;
      },
      errorText: "Model is required",
    },
    {
      caption: "Total",
      validate(value) {
        if (value === null || value < 0) return false;
        return true;
      },
      errorText: "Quantity must be a positive number",
    },
    {
      caption: "Purchase Cost",
      validate(value) {
        if (value !== null && value < 0) return false;
        return true;
      },
      errorText: "Purchase Cost must be a positive number",
    },
    {
      caption: "Order No",
    },
    {
      caption: "Purchase Date",
    },
    {
      caption: "Notes",
    },
    {
      caption: "Manufacturer",
      nullable: true,
    },
    {
      caption: "Supplier",
    },
    {
      caption: "Image",
    },
  ];

  return { columns, excelColumns };
};
