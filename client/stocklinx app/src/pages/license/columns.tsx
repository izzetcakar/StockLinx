import {
  IEmployeeProduct,
  ILicense,
  IAssetProduct,
} from "@interfaces/serverInterfaces";
import { Button, Loader } from "@mantine/core";
import { openCheckInModal } from "@/utils/modalUtils";
import {
  useManufacturer,
  useLicense,
  useCategory,
  useCompany,
  useSupplier,
} from "@queryhooks";
import { EntityCells } from "@/cells/Entity";
import { CategoryType } from "@/interfaces/enums";
import { useInitial } from "@/hooks/initial/useInitial";
import { EntityCardColumn } from "@/interfaces/clientInterfaces";
import { MRT_ColumnDef } from "mantine-react-table";
import LicenseForm from "@/forms/license/LicenseForm";
import HistoryLogs from "@/components/dataGrid/customLog/HistoryLogs";
import LicenseSeats from "@/components/dataGrid/productseats/License/LicenseSeats";

export const useColumns = () => {
  const initial = useInitial();
  const {
    data: categories,
    isRefetching: categoryLoading,
    refetch: getCategories,
  } = useCategory.GetAll();
  const {
    data: companyLK,
    isRefetching: companyLoading,
    refetch: getCompanyLK,
  } = useCompany.Lookup();
  const {
    data: supplierLK,
    isRefetching: supplierLoading,
    refetch: getSupplierLK,
  } = useSupplier.Lookup();
  const {
    data: manufacturerLK,
    isRefetching: manufacturerLoading,
    refetch: getManufacturerLK,
  } = useManufacturer.Lookup();
  const { mutate: employeeCheckIn } = useLicense.EmployeeCheckIn();
  const { mutate: assetCheckIn } = useLicense.AssetCheckIn();

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

  const columns: MRT_ColumnDef<ILicense>[] = [
    {
      accessorKey: "companyId",
      header: "Company",
      filterVariant: "multi-select",
      Cell: ({ row }) => EntityCells.Company(row.original.companyId),
      mantineFilterMultiSelectProps: () => ({
        data: companyLoading ? [] : companyLK,
        rightSection: companyLoading ? <Loader size={16} /> : null,
        onDropdownOpen: getCompanyLK,
      }),
    },
    {
      accessorKey: "tag",
      header: "License",
    },
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "licenseKey",
      header: "License Key",
    },
    {
      accessorKey: "expirationDate",
      header: "Expiration Date",
    },
    {
      accessorKey: "licenseEmail",
      header: "License Email",
    },
    {
      accessorKey: "licensedTo",
      header: "Licensed To",
    },
    {
      accessorKey: "quantity",
      header: "Total",
    },
    {
      accessorKey: "availableQuantity",
      header: "Avail",
      Cell: ({ row }) => row.original.availableQuantity || 0,
    },
    {
      header: "Checkin",
      filterVariant: "checkbox",
      accessorFn: (originalRow) =>
        originalRow.availableQuantity && originalRow.availableQuantity > 0
          ? "true"
          : "false",
      Cell: ({ row }) => (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            color={"green"}
            variant="filled"
            size="xs"
            disabled={
              row.original.availableQuantity !== undefined &&
              row.original?.availableQuantity < 1
            }
            onClick={() => onHeadToModal(row.original)}
          >
            Check In
          </Button>
        </div>
      ),
    },
    {
      accessorKey: "categoryId",
      header: "Category",
      filterVariant: "multi-select",
      Cell: ({ row }) => EntityCells.Category(row.original.categoryId),
      mantineFilterMultiSelectProps: () => ({
        data:
          categories
            ?.filter((c) => c.type === CategoryType.LICENSE)
            .map((category) => ({
              value: category.id,
              label: category.name,
            })) || [],
        rightSection: categoryLoading ? <Loader size={16} /> : null,
        onDropdownOpen: getCategories,
      }),
    },
    {
      accessorKey: "manufacturerId",
      header: "Manufacturer",
      filterVariant: "multi-select",
      Cell: ({ row }) => EntityCells.Manufacturer(row.original.manufacturerId),
      mantineFilterMultiSelectProps: () => ({
        data: manufacturerLoading ? [] : manufacturerLK,
        rightSection: manufacturerLoading ? <Loader size={16} /> : null,
        onDropdownOpen: getManufacturerLK,
      }),
    },
    {
      accessorKey: "supplierId",
      header: "Supplier",
      filterVariant: "multi-select",
      Cell: ({ row }) => EntityCells.Supplier(row.original.supplierId),
      mantineFilterMultiSelectProps: () => ({
        data: supplierLoading ? [] : supplierLK,
        rightSection: supplierLoading ? <Loader size={16} /> : null,
        onDropdownOpen: getSupplierLK,
      }),
    },
    {
      accessorKey: "purchaseCost",
      header: "Purchase Cost",
      filterVariant: "range-slider",
    },
    {
      accessorKey: "purchaseDate",
      header: "Purchase Date",
      accessorFn: (originalRow) =>
        originalRow.purchaseDate ? new Date(originalRow.purchaseDate) : "",
      filterVariant: "date-range",
      Cell: ({ cell }) =>
        cell.getValue() !== ""
          ? cell.getValue<Date>().toLocaleDateString()
          : "",
    },
    {
      accessorKey: "maintained",
      header: "Maintained",
    },
    {
      accessorKey: "reassignable",
      header: "Reassignable",
    },
    {
      accessorKey: "terminationDate",
      header: "Termination Date",
    },
    {
      accessorKey: "notes",
      header: "Notes",
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
