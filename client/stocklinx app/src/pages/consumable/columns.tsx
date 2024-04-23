import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import {
  BaseColumn,
  ExcelColumn,
} from "../../components/gridTable/interfaces/interfaces";
import { CategoryType, IConsumable } from "../../interfaces/serverInterfaces";
import { Anchor } from "@mantine/core";
import { useNavigate } from "react-router-dom";

export const useColumns = () => {
  const navigate = useNavigate();
  const branches = useSelector((state: RootState) => state.branch.branches);
  const suppliers = useSelector((state: RootState) => state.supplier.suppliers);
  const manufacturers = useSelector(
    (state: RootState) => state.manufacturer.manufacturers
  );
  const categories = useSelector(
    (state: RootState) => state.category.categories
  );

  const columns: BaseColumn[] = [
    {
      caption: "Name",
      dataField: "name",
      dataType: "string",
      renderComponent(e) {
        return (
          <Anchor
            onClick={() => navigate(`/consumable/${(e as IConsumable)?.id}`)}
            target="_blank"
            underline="always"
          >
            {(e as IConsumable).name}
          </Anchor>
        );
      },
    },
    {
      caption: "Category",
      dataField: "categoryId",
      lookup: {
        data: categories
          .filter((category) => category.type === CategoryType.CONSUMABLE)
          .map((category) => ({
            value: category.id,
            label: category.name,
          })),
      },
      dataType: "string",
    },
    {
      caption: "Model No",
      dataField: "modelNo",
      dataType: "string",
      renderComponent(e) {
        return (
          <Anchor
            onClick={() => navigate(`/consumable/${(e as IConsumable)?.id}`)}
            target="_blank"
            underline="always"
          >
            {(e as IConsumable).modelNo}
          </Anchor>
        );
      },
    },
    {
      caption: "Item No",
      dataField: "itemNo",
      dataType: "string",
      renderComponent(e) {
        return (
          <Anchor
            onClick={() => navigate(`/consumable/${(e as IConsumable)?.id}`)}
            target="_blank"
            underline="always"
          >
            {(e as IConsumable).itemNo}
          </Anchor>
        );
      },
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
        data: branches.map((branch) => ({
          value: branch.id,
          label: branch.name,
        })),
      },
      dataType: "string",
      visible: false,
    },
    {
      caption: "Supplier",
      dataField: "supplierId",
      lookup: {
        data: suppliers.map((supplier) => ({
          value: supplier.id,
          label: supplier.name,
        })),
      },
      dataType: "string",
      visible: false,
    },
    {
      caption: "Manufacturer",
      dataField: "manufacturerId",
      lookup: {
        data: manufacturers.map((manufacturer) => ({
          value: manufacturer.id,
          label: manufacturer.name,
        })),
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
      caption: "Model No",
    },
    {
      caption: "Item No",
    },
    {
      caption: "Quantity",
      validate(value) {
        if (value === null || value < 0) return false;
        return true;
      },
      errorText: "Quantity must be a positive number",
    },
    {
      caption: "Order Number",
    },
    {
      caption: "Purchase Date",
    },
    {
      caption: "Purchase Cost",
      validate(value) {
        if (value !== null && value < 0) {
          return false;
        }
        return true;
      },
      errorText: "Purchase Cost must be a positive number",
    },
    {
      caption: "Supplier",
      nullable: true,
    },
    {
      caption: "Manufacturer",
      nullable: true,
    },
    {
      caption: "Image",
    },
    {
      caption: "Notes",
    },
  ];

  return { columns, excelColumns };
};
