import { DataColumn } from "@interfaces/gridTableInterfaces";
import {
  IEmployeeProduct,
  ILicense,
  IAssetProduct,
} from "@interfaces/serverInterfaces";
import { Button } from "@mantine/core";
import { openCheckInModal } from "@/utils/modalUtils";
import { useManufacturer } from "@/hooks/query/manufacturer";
import { useCompany } from "@/hooks/query/company";
import { useCategory } from "@/hooks/query/category";
import { useLicense } from "@/hooks/query/license";
import { useSupplier } from "@/hooks/query/supplier";
import { EntityCells } from "@/cells/Entity";
import { CategoryType } from "@/interfaces/enums";
import { useInitial } from "@/hooks/initial/useInitial";
import { EntityCardColumn } from "@/interfaces/clientInterfaces";
import LicenseQuantity from "@/cells/LicenseQuantity";
import LicenseForm from "@/forms/license/LicenseForm";
import HistoryLogs from "@/components/dataGrid/customLog/HistoryLogs";
import LicenseSeats from "@/components/dataGrid/productseats/License/LicenseSeats";

export const useColumns = () => {
  const { mutate: employeeCheckIn } = useLicense.EmployeeCheckIn();
  const { mutate: assetCheckIn } = useLicense.AssetCheckIn();
  const { data: categories } = useCategory.GetAll();
  const { data: companyLK } = useCompany.Lookup();
  const { data: supplierLK } = useSupplier.Lookup();
  const { refetch: getManufacturerLK } = useManufacturer.Lookup();
  const initial = useInitial();

  const onEmployeeCheckInHandler = (employeeProduct: IEmployeeProduct) => {
    employeeCheckIn({
      employeeId: employeeProduct.employeeId,
      productId: employeeProduct.licenseId as string,
      assaignDate: employeeProduct.assignDate,
      notes: employeeProduct.notes,
      quantity: employeeProduct.quantity,
    });
  };

  const onAssetCheckInHandler = (employeeProduct: IAssetProduct) => {
    assetCheckIn({
      assetId: employeeProduct.assetId as string,
      productId: employeeProduct.licenseId as string,
      assaignDate: employeeProduct.assignDate,
      notes: employeeProduct.notes,
      quantity: employeeProduct.quantity,
    });
  };

  const onHeadToModal = (license: ILicense) => {
    const newEmployeeProduct = initial.EmployeeProduct;
    newEmployeeProduct.licenseId = license.id;
    const newAssetProduct = initial.AssetProduct;
    newAssetProduct.licenseId = license.id;
    openCheckInModal(
      license.companyId,
      ["Employee", "Asset"],
      newEmployeeProduct,
      onEmployeeCheckInHandler,
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
      dataType: "action",
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
              onClick={() => onHeadToModal(e as ILicense)}
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
        data: companyLK || [],
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
        data: supplierLK || [],
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

  const cardColumns: EntityCardColumn[] = [
    {
      title: (license: ILicense) => {
        return (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "5px",
            }}
          >
            <div>Tag : {license.tag}</div>
            <div>Name : {license.name}</div>
          </div>
        );
      },
      renderData: (e) => <LicenseForm license={e as ILicense} />,
    },
    {
      title: "Seats",
      renderData: (e) => <LicenseSeats license={e as ILicense} />,
    },
    {
      title: "History",
      renderData: (e) => <HistoryLogs id={(e as ILicense).id} />,
    },
  ];

  return { columns, cardColumns };
};
