import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import {
  ExcelColumn,
  Column,
} from "../../components/gridTable/interfaces/interfaces";
import {
  CategoryType,
  IAccessory,
  IAccessoryCheckInDto,
  IDeployedProduct,
} from "../../interfaces/interfaces";
import { Anchor, Button, Image } from "@mantine/core";
import { accessoryActions } from "../../redux/accessory/actions";
import { openCheckInModal } from "../../modals/modals";
import { useNavigate } from "react-router-dom";
import { getImage } from "../../functions/Image";
import base_accessory from "../../assets/baseProductImages/base_accessory.png";
import uuid4 from "uuid4";

export const useColumns = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const locations = useSelector((state: RootState) => state.location.locations);
  const categories = useSelector(
    (state: RootState) => state.category.categories
  );
  const accessories = useSelector(
    (state: RootState) => state.accessory.accessories
  );

  const handleCheckIn = (data: IDeployedProduct) => {
    dispatch(
      accessoryActions.checkIn({
        checkInDto: {
          accessoryId: data.accessoryId,
          userId: data.userId,
          notes: data.notes,
          assaignDate: data.assignDate,
        } as IAccessoryCheckInDto,
      })
    );
  };
  const checkIn = (id: string) => {
    const newDeployedProduct: IDeployedProduct = {
      id: uuid4(),
      userId: "",
      accessoryId: id,
      assetId: null,
      licenseId: null,
      componentId: null,
      consumableId: null,
      assignDate: new Date(),
      notes: null,
    };
    openCheckInModal(newDeployedProduct, handleCheckIn);
  };

  const columns: Column[] = [
    {
      caption: "Name",
      dataField: "name",
      dataType: "string",
      renderComponent(e) {
        return (
          <Anchor
            onClick={() => navigate(`/accessory/${(e as IAccessory)?.id}`)}
            target="_blank"
            underline={true}
          >
            {(e as IAccessory).name}
          </Anchor>
        );
      },
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
      dataType: "action",
      renderComponent(e) {
        return (
          <Anchor
            onClick={() => navigate(`/accessory/${(e as IAccessory)?.id}`)}
            target="_blank"
            underline={true}
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
    {
      dataField: "id",
      caption: "Checkin/Checkout",
      dataType: "action",
      renderComponent(e) {
        const id = (e as IAccessory).id;
        const accessory = accessories.find((accessory) => accessory.id === id);
        return (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              color={"green"}
              variant="filled"
              size="xs"
              disabled={
                accessory?.availableQuantity !== undefined &&
                accessory?.availableQuantity < 1
              }
              onClick={() => checkIn(id)}
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
