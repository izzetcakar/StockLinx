import { DataColumn } from "@interfaces/gridTableInterfaces";
import { Button } from "@mantine/core";
import { IAssetProduct, IComponent } from "@interfaces/serverInterfaces";
import { openCheckInModal } from "@/utils/modalUtils";
import { useCategory } from "@/hooks/query/category";
import { useCompany } from "@/hooks/query/company";
import { useComponent } from "@/hooks/query/component";
import { EntityCells } from "@/cells/Entity";
import { CategoryType } from "@/interfaces/enums";
import { useInitial } from "@/hooks/initial/useInitial";
import { EntityCardColumn } from "@/interfaces/clientInterfaces";
import AssetProductQuantityCell from "@/cells/AssetProductQuantityCell";
import ComponentForm from "@/forms/component/ComponentForm";
import AssetProductSeats from "@/components/dataGrid/productseats/AssetProductSeats";
import HistoryLogs from "@/components/dataGrid/customLog/HistoryLogs";

export const useColumns = () => {
  const initial = useInitial();
  const { data: categories } = useCategory.GetAll();
  const { data: companyLK } = useCompany.Lookup();
  const { mutate: checkIn } = useComponent.CheckIn();
  const { mutate: checkOut } = useComponent.CheckOut();

  const onCheckInHandler = (data: IAssetProduct) => {
    checkIn({
      assetId: data.assetId,
      productId: data.componentId as string,
      notes: data.notes,
      assaignDate: data.assignDate,
      quantity: data.quantity,
    });
  };

  const onHeadToModal = (component: IComponent) => {
    const newAssetProduct = initial.AssetProduct;
    newAssetProduct.componentId = component.id;
    openCheckInModal(
      component.companyId,
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
      dataType: "action",
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
              onClick={() => onHeadToModal(component as IComponent)}
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
        data: companyLK || [],
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

  const cardColumns: EntityCardColumn[] = [
    {
      title: (component: IComponent) => {
        return (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "5px",
            }}
          >
            <div>Tag : {component.tag}</div>
            <div>Name : {component.name}</div>
          </div>
        );
      },
      renderData: (e) => <ComponentForm component={e as IComponent} />,
    },
    {
      title: "Seats",
      renderData: (e) => (
        <AssetProductSeats
          field="componentId"
          value={e.id}
          checkOut={checkOut}
        />
      ),
    },
    {
      title: "History",
      renderData: (e) => <HistoryLogs id={e.id} />,
    },
  ];

  return { columns, cardColumns };
};
