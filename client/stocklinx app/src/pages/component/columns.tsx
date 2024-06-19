import { DataColumn } from "@interfaces/gridTableInterfaces";
import { Button } from "@mantine/core";
import {
  CategoryType,
  IAssetProduct,
  IComponent,
} from "@interfaces/serverInterfaces";
import { openCheckInModal } from "../../modals/modals";
import { initialAssetProduct } from "../../initials/initials";
import { useCategory } from "@/hooks/category";
import { useCompany } from "@/hooks/company";
import { useComponent } from "@/hooks/component";
import { EntityCells } from "@/cells/Entity";
import AssetProductQuantityCell from "@/cells/AssetProductQuantityCell";

export const useColumns = () => {
  const { mutate: checkIn } = useComponent.CheckIn();
  const { data: categories } = useCategory.GetAll();
  const { data: companyLookup } = useCompany.Lookup();

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
        data:
          categories
            ?.filter((category) => category.type === CategoryType.COMPONENT)
            .map((category) => ({
              value: category.id,
              label: category.name,
            })) || [],
      },
      dataType: "string",
      renderComponent: (e) =>
        EntityCells.Category((e as IComponent).categoryId),
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
      caption: "Company",
      dataField: "companyId",
      lookup: {
        data: companyLookup || [],
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

  return { columns };
};
