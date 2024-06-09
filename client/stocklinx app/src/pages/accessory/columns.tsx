import { ExcelColumn, DataColumn } from "@interfaces/gridTableInterfaces";
import {
  CategoryType,
  IAccessory,
  IUserProduct,
} from "@interfaces/serverInterfaces";
import { Anchor, Button, Image } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { getImage } from "../../utils/Image";
import { openCheckInModal } from "../../modals/modals";
import { initialUserProduct } from "../../initials/initials";
import { useAccessory } from "@/hooks/accessory";
import { useCategory } from "@/hooks/category";
import { useLocation } from "@/hooks/location";
import { useProductStatus } from "@/hooks/productStatus";
import base_accessory from "@assets/baseProductImages/base_accessory.png";

export const useColumns = () => {
  const navigate = useNavigate();
  const { mutate: checkIn } = useAccessory.CheckIn();
  // const { mutate: checkOut } = useAccessory.CheckOut();
  const { data: categories } = useCategory.GetAll();
  const { data: locationLookup } = useLocation.Lookup();
  const { data: productStatusLookup, refetch: fetchProductStatus } =
    useProductStatus.Lookup();

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
      renderComponent(e) {
        return (
          <Anchor
            onClick={() => navigate(`/accessory/${(e as IAccessory)?.id}`)}
            target="_blank"
            underline="always"
          >
            {(e as IAccessory).name}
          </Anchor>
        );
      },
    },
    {
      dataField: "productStatusId",
      caption: "Status",
      lookup: {
        data: productStatusLookup || [],
        dataSource: fetchProductStatus,
      },
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
    },
    {
      caption: "Model",
      dataField: "modelNo",
      dataType: "action",
      renderComponent(e) {
        return (
          <Anchor
            onClick={() => navigate(`/accessory/${(e as IAccessory)?.id}`)}
            target="_blank"
            underline="always"
          >
            {(e as IAccessory).modelNo}
          </Anchor>
        );
      },
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
