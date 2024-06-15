import { DataColumn, ExcelColumn } from "@interfaces/gridTableInterfaces";
import { useNavigate } from "react-router-dom";
import { Anchor, Button } from "@mantine/core";
import {
  CategoryType,
  IAssetProduct,
  IComponent,
} from "@interfaces/serverInterfaces";
import { openCheckInModal } from "../../modals/modals";
import { initialAssetProduct } from "../../initials/initials";
import { useCategory } from "@/hooks/category";
import { useBranch } from "@/hooks/branch";
import { useLocation } from "@/hooks/location";
import { useComponent } from "@/hooks/component";
import AssetProductQuantityCell from "@/cells/AssetProductQuantityCell";

export const useColumns = () => {
  const navigate = useNavigate();
  const { mutate: checkIn } = useComponent.CheckIn();
  const { data: categories } = useCategory.GetAll();
  const { data: branchLookup } = useBranch.Lookup();
  const { data: locationLookup } = useLocation.Lookup();

  const onCheckInHandler = (data: IAssetProduct) => {
    checkIn({
      assetId: data.assetId,
      productId: data.componentId as string,
      notes: data.notes,
      assaignDate: data.assignDate,
      quantity: data.quantity,
    });
  };

  const onHeadToModal = (id: string) => {
    const newAssetProduct = initialAssetProduct;
    newAssetProduct.componentId = id;
    openCheckInModal(
      ["Asset"],
      undefined,
      undefined,
      newAssetProduct,
      onCheckInHandler
    );
  };

  const columns: DataColumn[] = [
    {
      dataField: "tag",
      caption: "Component",
      dataType: "string",
    },
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
        data:
          categories
            ?.filter((category) => category.type === CategoryType.COMPONENT)
            .map((category) => ({
              value: category.id,
              label: category.name,
            })) || [],
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
      renderComponent: (e) =>
        AssetProductQuantityCell({
          productId: (e as IComponent).id,
          productType: "Component",
          totalQuantity: (e as IComponent).quantity,
        }),
    },
    {
      caption: "Location",
      dataField: "locationId",
      lookup: {
        data: locationLookup || [],
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
    {
      dataField: "id",
      caption: "Checkin",
      dataType: "action",
      renderComponent(e) {
        const component = e as IComponent;
        return (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              color={"green"}
              variant="filled"
              size="xs"
              disabled={
                component.availableQuantity !== undefined &&
                component?.availableQuantity < 1
              }
              onClick={() => onHeadToModal(component.id)}
            >
              Check In
            </Button>
          </div>
        );
      },
    },
    // INVISIBLE COLUMNS
    {
      caption: "Branch",
      dataField: "branchId",
      lookup: {
        data: branchLookup || [],
      },
      dataType: "string",
      allowVisible: false,
    },
    {
      dataField: "imagePath",
      caption: "Image",
      dataType: "string",
      allowVisible: false,
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
