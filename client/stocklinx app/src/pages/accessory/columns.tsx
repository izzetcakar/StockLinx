import { DataColumn } from "@interfaces/gridTableInterfaces";
import { IAccessory, IUserProduct } from "@interfaces/serverInterfaces";
import { Button, Image } from "@mantine/core";
import { getImage } from "../../utils/imageUtils";
import { openCheckInModal } from "@/utils/modalUtils";
import { useAccessory } from "@/hooks/query/accessory";
import { useCategory } from "@/hooks/query/category";
import { CategoryType } from "@/interfaces/enums";
import { useInitial } from "@/hooks/initial/useInitial";
import { EntityCells } from "@/cells/Entity";
import { EntityCardColumn } from "@/interfaces/clientInterfaces";
import base_accessory from "@assets/baseProductImages/base_accessory.png";
import UserProductQuantityCell from "@/cells/UserProductQuantityCell";
import AccessoryForm from "@/forms/accessory/AccessoryForm";
import UserProductSeats from "@/cells/productseats/UserProductSeats";
import HistoryLogs from "@/components/dataGrid/customLog/HistoryLogs";

export const useColumns = () => {
  const initial = useInitial();
  const { data: categories } = useCategory.GetAll();
  const { mutate: checkIn } = useAccessory.CheckIn();
  const { mutate: checkOut } = useAccessory.CheckOut();

  const onCheckInHandler = (data: IUserProduct) => {
    checkIn({
      productId: data.accessoryId as string,
      userId: data.userId,
      assaignDate: data.assignDate,
      notes: data.notes,
      quantity: data.quantity,
    });
  };

  const onHeadToModal = (id: string) => {
    const newUserProduct = initial.UserProduct;
    newUserProduct.accessoryId = id;
    openCheckInModal(["User"], newUserProduct, onCheckInHandler);
  };

  const columns: DataColumn[] = [
    {
      dataField: "tag",
      caption: "Accessory",
      dataType: "string",
    },
    {
      dataField: "name",
      caption: "Name",
      dataType: "string",
    },
    {
      caption: "Image",
      dataField: "imagePath",
      dataType: "action",
      renderComponent(e) {
        const image = getImage((e as IAccessory).imagePath);
        return (
          <Image
            src={image ? image : base_accessory}
            height={50}
            radius="md"
            width="fit-content"
            fit="contain"
          />
        );
      },
    },
    {
      caption: "Category",
      dataField: "categoryId",
      dataType: "string",
      lookup: {
        data:
          categories
            ?.filter((category) => category.type === CategoryType.ACCESSORY)
            .map((category) => ({
              value: category.id,
              label: category.name,
            })) || [],
      },
      renderComponent: (e) =>
        EntityCells.Category((e as IAccessory).categoryId),
    },
    {
      caption: "Model",
      dataField: "modelNo",
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
          productId: (e as IAccessory).id,
          productType: "Accessory",
          totalQuantity: (e as IAccessory).quantity,
        }),
    },
    {
      dataField: "purchaseCost",
      caption: "Purchase Cost",
      dataType: "number",
    },
    {
      dataField: "id",
      caption: "Checkin",
      dataType: "action",
      renderComponent(e) {
        const accessory = e as IAccessory;
        return (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              color={"green"}
              variant="filled"
              size="xs"
              disabled={(accessory?.availableQuantity as number) < 1}
              onClick={() => onHeadToModal(accessory.id)}
            >
              Check In
            </Button>
          </div>
        );
      },
    },
    // INVISIBLE COLUMNS
    {
      caption: "Notes",
      dataField: "notes",
      dataType: "string",
      allowVisible: false,
    },
  ];

  const cardColumns: EntityCardColumn[] = [
    {
      title: (accessory: IAccessory) => {
        return (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "5px",
            }}
          >
            <div>Tag : {accessory.tag}</div>
            <div>Name : {accessory.name}</div>
          </div>
        );
      },
      renderData: (e) => <AccessoryForm accessory={e as IAccessory} />,
    },
    {
      title: "Seats",
      renderData: (e) => (
        <UserProductSeats
          productIdField="accessoryId"
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
