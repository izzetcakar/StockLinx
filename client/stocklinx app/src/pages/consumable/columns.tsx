import { DataColumn } from "@interfaces/gridTableInterfaces";
import { IConsumable, IUserProduct } from "@interfaces/serverInterfaces";
import { Button } from "@mantine/core";
import { openCheckInModal } from "@/utils/modalUtils";
import { useConsumable } from "@/hooks/query/consumable";
import { useCategory } from "@/hooks/query/category";
import { useCompany } from "@/hooks/query/company";
import { useSupplier } from "@/hooks/query/supplier";
import { useManufacturer } from "@/hooks/query/manufacturer";
import { EntityCells } from "@/cells/Entity";
import { CategoryType } from "@/interfaces/enums";
import { useInitial } from "@/hooks/initial/useInitial";
import { EntityCardColumn } from "@/interfaces/clientInterfaces";
import UserProductQuantityCell from "@/cells/UserProductQuantityCell";
import ConsumableForm from "@/forms/consumable/ConsumableForm";
import UserProductSeats from "@/cells/productseats/UserProductSeats";
import HistoryLogs from "@/components/dataGrid/customLog/HistoryLogs";

export const useColumns = () => {
  const initial = useInitial();
  const { data: categories } = useCategory.GetAll();
  const { data: companyLK } = useCompany.Lookup();
  const { data: supplierLK } = useSupplier.Lookup();
  const { data: manufacturerLK } = useManufacturer.Lookup();
  const { mutate: checkIn } = useConsumable.CheckIn();
  const { mutate: checkOut } = useConsumable.CheckOut();

  const onCheckInHandler = (data: IUserProduct) => {
    checkIn({
      productId: data.consumableId as string,
      userId: data.userId,
      assaignDate: data.assignDate,
      notes: data.notes,
      quantity: data.quantity,
    });
  };

  const onHeadToModal = (id: string) => {
    const newUserProduct = initial.UserProduct;
    newUserProduct.consumableId = id;
    openCheckInModal(["User"], newUserProduct, onCheckInHandler);
  };

  const columns: DataColumn[] = [
    {
      dataField: "tag",
      caption: "Consumable",
      dataType: "string",
    },
    {
      caption: "Name",
      dataField: "name",
      dataType: "string",
    },
    {
      caption: "Category",
      dataField: "categoryId",
      lookup: {
        data:
          categories
            ?.filter((category) => category.type === CategoryType.CONSUMABLE)
            .map((category) => ({
              value: category.id,
              label: category.name,
            })) || [],
      },
      dataType: "string",
      renderComponent: (e) =>
        EntityCells.Category((e as IConsumable).categoryId),
    },
    {
      caption: "Model No",
      dataField: "modelNo",
      dataType: "string",
    },
    {
      caption: "Item No",
      dataField: "itemNo",
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
        UserProductQuantityCell({
          productId: (e as IConsumable).id,
          productType: "Consumable",
          totalQuantity: (e as IConsumable).quantity,
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
        const consumable = e as IConsumable;
        return (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              color={"green"}
              variant="filled"
              size="xs"
              disabled={
                consumable.availableQuantity !== undefined &&
                consumable?.availableQuantity < 1
              }
              onClick={() => onHeadToModal(consumable.id)}
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
      caption: "Supplier",
      dataField: "supplierId",
      lookup: {
        data: supplierLK || [],
      },
      dataType: "string",
      allowVisible: false,
    },
    {
      caption: "Manufacturer",
      dataField: "manufacturerId",
      lookup: {
        data: manufacturerLK || [],
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
      allowVisible: false,
    },
  ];

  const cardColumns: EntityCardColumn[] = [
    {
      title: (consumable: IConsumable) => {
        return (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "5px",
            }}
          >
            <div>Tag : {consumable.tag}</div>
            <div>Name : {consumable.name}</div>
          </div>
        );
      },
      renderData: (e) => <ConsumableForm consumable={e as IConsumable} />,
    },
    {
      title: "Seats",
      renderData: (e) => (
        <UserProductSeats
          productIdField="consumableId"
          productId={e.id}
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
