import { DataColumn } from "@interfaces/gridTableInterfaces";
import {
  CategoryType,
  IAccessory,
  IUserProduct,
} from "@interfaces/serverInterfaces";
import { Button, Image } from "@mantine/core";
import { getImage } from "../../utils/imageUtils";
import { openCheckInModal } from "../../modals/modals";
import { initialUserProduct } from "../../initials/initials";
import { useAccessory } from "@/hooks/accessory";
import { useCategory } from "@/hooks/category";
import { EntityCells } from "@/cells/Entity";
import base_accessory from "@assets/baseProductImages/base_accessory.png";
import UserProductQuantityCell from "@/cells/UserProductQuantityCell";

export const useColumns = () => {
  const { mutate: checkIn } = useAccessory.CheckIn();
  const { data: categories } = useCategory.GetAll();

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
    const newUserProduct = initialUserProduct;
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

  return { columns };
};
