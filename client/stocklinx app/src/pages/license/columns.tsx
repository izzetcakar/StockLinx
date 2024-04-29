import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import {
  BaseColumn,
  ExcelColumn,
} from "../../components/gridTable/interfaces/interfaces";
import {
  CategoryType,
  IUserProduct,
  ILicense,
} from "../../interfaces/serverInterfaces";
import { licenseActions } from "../../redux/license/actions";
import uuid4 from "uuid4";
import { Anchor, Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";

export const useColumns = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const branches = useSelector((state: RootState) => state.branch.branches);
  const manufacturers = useSelector(
    (state: RootState) => state.manufacturer.manufacturers
  );
  const suppliers = useSelector((state: RootState) => state.supplier.suppliers);
  const categories = useSelector(
    (state: RootState) => state.category.categories
  );

  const handleCheckIn = (data: IUserProduct) => {
    dispatch(
      licenseActions.checkIn({
        checkInDto: {
          productId: data.licenseId,
          userId: data.userId,
          notes: data.notes,
          assaignDate: data.assignDate,
          quantity: data.quantity,
        } as IProductCheckInDto,
      })
    );
  };
  const checkIn = (id: string) => {
    const newUserProduct: IUserProduct = {
      id: uuid4(),
      userId: "",
      assetId: null,
      licenseId: id,
      accessoryId: null,
      componentId: null,
      consumableId: null,
      assignDate: new Date(),
      notes: null,
      productStatusId: null,
      quantity: 1,
    };
    openCheckInModal(newUserProduct, handleCheckIn);
  };

  const columns: BaseColumn[] = [
    {
      caption: "Name",
      dataField: "name",
      dataType: "string",
      renderComponent(e) {
        return (
          <Anchor
            onClick={() => navigate(`/license/${(e as ILicense)?.id}`)}
            target="_blank"
            underline="always"
          >
            {(e as ILicense).name}
          </Anchor>
        );
      },
    },
    {
      caption: "License Key",
      dataField: "licenseKey",
      dataType: "string",
      renderComponent(e) {
        return (
          <Anchor
            onClick={() => navigate(`/license/${(e as ILicense)?.id}`)}
            target="_blank"
            underline="always"
          >
            {(e as ILicense).licenseKey}
          </Anchor>
        );
      },
    },
    {
      caption: "Expiration Date",
      dataField: "expirationDate",
      dataType: "date",
    },
    {
      caption: "License Email",
      dataField: "licenseEmail",
      dataType: "string",
    },
    {
      caption: "Licensed To",
      dataField: "licensedTo",
      dataType: "string",
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
      dataField: "id",
      caption: "Checkin/Checkout",
      dataType: "action",
      renderComponent(e) {
        return (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              color={"green"}
              variant="filled"
              size="xs"
              onClick={() => checkIn((e as ILicense).id)}
              disabled={(e as ILicense).availableQuantity === 0}
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
      visible: false,
    },
    {
      caption: "Order No",
      dataField: "orderNo",
      dataType: "string",
      visible: false,
    },
    {
      caption: "Purchase Date",
      dataField: "purchaseDate",
      dataType: "date",
      visible: false,
    },
    {
      caption: "Purchase Cost",
      dataField: "purchaseCost",
      dataType: "number",
      visible: false,
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
      visible: false,
    },
    {
      caption: "Category",
      dataField: "categoryId",
      lookup: {
        data: categories
          .filter((c) => c.type === CategoryType.LICENSE)
          .map((category) => ({
            value: category.id,
            label: category.name,
          })),
      },
      dataType: "string",
      visible: false,
    },
    {
      caption: "Maintained",
      dataField: "maintained",
      dataType: "boolean",
      visible: false,
    },
    {
      caption: "Reassignable",
      dataField: "reassignable",
      dataType: "boolean",
      visible: false,
    },
    {
      caption: "Termination Date",
      dataField: "terminationDate",
      dataType: "date",
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
      caption: "License Key",
      validate(value) {
        return value !== null;
      },
      errorText: "License Key is required",
    },
    {
      caption: "Expiration Date",
    },
    {
      caption: "License Email",
    },
    {
      caption: "Licensed To",
    },
    {
      caption: "Manufacturer",
      nullable: true,
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
      caption: "Avail",
    },
    {
      caption: "Purchase Date",
    },
    {
      caption: "Purchase Cost",
      validate(value) {
        if (value !== null && value < 0) return false;
        return true;
      },
    },
    {
      caption: "Supplier",
      nullable: true,
    },
    {
      caption: "Category",
      validate(value) {
        return value !== null;
      },
      errorText: "Category is required",
    },
    {
      caption: "Maintained",
      validate(value) {
        return value !== null;
      },
      errorText: "Maintained is required",
    },
    {
      caption: "Reassignable",
      validate(value) {
        return value !== null;
      },
      errorText: "Reassignable is required",
    },
    {
      caption: "Termination Date",
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
