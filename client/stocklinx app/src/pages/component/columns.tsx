import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import {
  BaseColumn,
  ExcelColumn,
} from "../../components/gridTable/interfaces/interfaces";
import { useNavigate } from "react-router-dom";
import { Anchor } from "@mantine/core";
import { IComponent } from "../../interfaces/interfaces";

export const useColumns = () => {
  const navigate = useNavigate();
  const branches = useSelector((state: RootState) => state.branch.branches);
  const locations = useSelector((state: RootState) => state.location.locations);
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
            onClick={() => navigate(`/component/${(e as IComponent)?.id}`)}
            target="_blank"
            underline="always"
          >
            {(e as IComponent).name}
          </Anchor>
        );
      },
    },
    {
      caption: "Serial",
      dataField: "serialNo",
      dataType: "string",
      renderComponent(e) {
        return (
          <Anchor
            onClick={() => navigate(`/asset/${(e as IComponent)?.id}`)}
            target="_blank"
            underline="always"
          >
            {(e as IComponent).serialNo}
          </Anchor>
        );
      },
    },
    {
      caption: "Category",
      dataField: "categoryId",
      lookup: {
        data: categories.map((category) => ({
          value: category.id,
          label: category.name,
        })),
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
        data: locations.map((location) => ({
          value: location.id,
          label: location.name,
        })),
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
        data: branches.map((branch) => ({
          value: branch.id,
          label: branch.name,
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
      caption: "Serial No",
    },
    {
      caption: "Category",
      validate(value) {
        return value !== null;
      },
      errorText: "Category is required",
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
      caption: "Image",
    },
    {
      caption: "Notes",
    },
  ];
  return { columns, excelColumns };
};
