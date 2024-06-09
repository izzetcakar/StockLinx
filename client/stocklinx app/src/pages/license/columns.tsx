import { DataColumn, ExcelColumn } from "@interfaces/gridTableInterfaces";
import {
  CategoryType,
  IUserProduct,
  ILicense,
  IAssetProduct,
} from "@interfaces/serverInterfaces";
import { Anchor, Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { openCheckInModal } from "../../modals/modals";
import {
  initialAssetProduct,
  initialUserProduct,
} from "../../initials/initials";
import { useManufacturer } from "@/hooks/manufacturer";
import { useBranch } from "@/hooks/branch";
import { useCategory } from "@/hooks/category";
import { useLicense } from "@/hooks/license";
import { useSupplier } from "@/hooks/supplier";

export const useColumns = () => {
  const navigate = useNavigate();
  const { mutate: userCheckIn } = useLicense.UserCheckIn();
  const { mutate: assetCheckIn } = useLicense.AssetCheckIn();
  const { data: categories } = useCategory.GetAll();
  const { data: branchLookup } = useBranch.Lookup();
  const { data: manufacturerLookup } = useManufacturer.Lookup();
  const { data: supplierLookup } = useSupplier.Lookup();

  const onUserCheckInHandler = (userProduct: IUserProduct) => {
    userCheckIn({
      userId: userProduct.userId,
      productId: userProduct.licenseId as string,
      assaignDate: userProduct.assignDate,
      notes: userProduct.notes,
      quantity: userProduct.quantity,
    });
  };

  const onAssetCheckInHandler = (userProduct: IAssetProduct) => {
    assetCheckIn({
      assetId: userProduct.assetId as string,
      productId: userProduct.licenseId as string,
      assaignDate: userProduct.assignDate,
      notes: userProduct.notes,
      quantity: userProduct.quantity,
    });
  };

  const onHeadToModal = (id: string) => {
    const newUserProduct = initialUserProduct;
    newUserProduct.licenseId = id;
    const newAssetProduct = initialAssetProduct;
    newAssetProduct.licenseId = id;
    openCheckInModal(
      ["User", "Asset"],
      newUserProduct,
      onUserCheckInHandler,
      newAssetProduct,
      onAssetCheckInHandler
    );
  };
  const columns: DataColumn[] = [
    {
      dataField: "tag",
      caption: "License",
      dataType: "string",
    },
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
        data: manufacturerLookup || [],
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
      caption: "Checkin",
      dataType: "action",
      renderComponent(e) {
        return (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              color={"green"}
              variant="filled"
              size="xs"
              onClick={() => onHeadToModal((e as ILicense).id)}
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
        data: branchLookup || [],
      },
      dataType: "string",
      allowVisible: false,
    },
    {
      caption: "Order No",
      dataField: "orderNo",
      dataType: "string",
      allowVisible: false,
    },
    {
      caption: "Purchase Date",
      dataField: "purchaseDate",
      dataType: "date",
      allowVisible: false,
    },
    {
      caption: "Purchase Cost",
      dataField: "purchaseCost",
      dataType: "number",
      allowVisible: false,
    },
    {
      caption: "Supplier",
      dataField: "supplierId",
      lookup: {
        data: supplierLookup || [],
      },
      dataType: "string",
      allowVisible: false,
    },
    {
      caption: "Category",
      dataField: "categoryId",
      lookup: {
        data:
          categories
            ?.filter((c) => c.type === CategoryType.LICENSE)
            .map((category) => ({
              value: category.id,
              label: category.name,
            })) || [],
      },
      dataType: "string",
      allowVisible: false,
    },
    {
      caption: "Maintained",
      dataField: "maintained",
      dataType: "boolean",
      allowVisible: false,
    },
    {
      caption: "Reassignable",
      dataField: "reassignable",
      dataType: "boolean",
      allowVisible: false,
    },
    {
      caption: "Termination Date",
      dataField: "terminationDate",
      dataType: "date",
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
