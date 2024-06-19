import { DataColumn } from "@interfaces/gridTableInterfaces";
import {
  CategoryType,
  IUserProduct,
  ILicense,
  IAssetProduct,
} from "@interfaces/serverInterfaces";
import { Button } from "@mantine/core";
import { openCheckInModal } from "../../modals/modals";
import {
  initialAssetProduct,
  initialUserProduct,
} from "../../initials/initials";
import { useManufacturer } from "@/hooks/manufacturer";
import { useCompany } from "@/hooks/company";
import { useCategory } from "@/hooks/category";
import { useLicense } from "@/hooks/license";
import { useSupplier } from "@/hooks/supplier";
import LicenseQuantity from "@/cells/LicenseQuantity";
import { EntityCells } from "@/cells/Entity";

export const useColumns = () => {
  const { mutate: userCheckIn } = useLicense.UserCheckIn();
  const { mutate: assetCheckIn } = useLicense.AssetCheckIn();
  const { data: categories } = useCategory.GetAll();
  const { data: companyLookup } = useCompany.Lookup();
  const { refetch: getManufacturerLK } = useManufacturer.Lookup();
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
    },
    {
      caption: "License Key",
      dataField: "licenseKey",
      dataType: "string",
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
        dataSource: getManufacturerLK,
      },
      dataType: "string",
      renderComponent: (e) =>
        EntityCells.Manufacturer((e as ILicense).manufacturerId),
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
      renderComponent: (e) => LicenseQuantity(e as ILicense),
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
      caption: "Company",
      dataField: "companyId",
      lookup: {
        data: companyLookup || [],
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

  return { columns };
};
