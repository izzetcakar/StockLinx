import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import {
  DataColumn,
  ExcelColumn,
} from "@interfaces/gridTableInterfaces";
import {
  CategoryType,
  IConsumable,
  IUserProduct,
} from "@interfaces/serverInterfaces";
import { Anchor, Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { consumableActions } from "../../redux/consumable/actions";
import { closeModal, openCheckInModal } from "../../modals/modals";
import { initialUserProduct } from "../../initials/initials";

export const useColumns = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const branches = useSelector((state: RootState) => state.branch.branches);
  const suppliers = useSelector((state: RootState) => state.supplier.suppliers);
  const manufacturers = useSelector(
    (state: RootState) => state.manufacturer.manufacturers
  );
  const categories = useSelector(
    (state: RootState) => state.category.categories
  );

  const handleCheckIn = (data: IUserProduct) => {
    dispatch(
      consumableActions.checkIn({
        checkInDto: {
          productId: data.accessoryId as string,
          userId: data.userId,
          assaignDate: data.assignDate,
          notes: data.notes,
          quantity: data.quantity,
        },
        onSubmit: () => closeModal("userProduct_checkIn_modal"),
      })
    );
  };

  const checkIn = (id: string) => {
    const newUserProduct = initialUserProduct;
    newUserProduct.accessoryId = id;
    openCheckInModal(["User"], newUserProduct, handleCheckIn);
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
              onClick={() => checkIn(consumable.id)}
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
        data: branches.map((branch) => ({
          value: branch.id,
          label: branch.name,
        })),
      },
      dataType: "string",
      allowVisible: false,
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
      allowVisible: false,
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
