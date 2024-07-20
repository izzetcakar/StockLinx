import { IAccessory, IEmployeeProduct } from "@interfaces/serverInterfaces";
import {
  useAccessory,
  useCategory,
  useCompany,
  useManufacturer,
  useSupplier,
} from "@queryhooks";
import { EntityCardColumn } from "@/interfaces/clientInterfaces";
import { MRT_ColumnDef } from "mantine-react-table";
import { EntityCells } from "@/cells/Entity";
import { Button, Image, Loader } from "@mantine/core";
import { openCheckInModal } from "@/utils/modalUtils";
import { useInitial } from "@/hooks/initial/useInitial";
import { getImage } from "@/utils/imageUtils";
import AccessoryForm from "@/forms/accessory/AccessoryForm";
import HistoryLogs from "@/components/dataGrid/customLog/HistoryLogs";
import EmployeeProductSeats from "@/components/dataGrid/productseats/EmployeeProductSeats";
import base_accessory from "@/assets/baseProductImages/base_accessory.png";

export const useColumns = () => {
  const initial = useInitial();
  const {
    data: companyLK,
    isRefetching: companyLoading,
    refetch: getCompanyLK,
  } = useCompany.Lookup();
  const {
    data: categoryLK,
    isRefetching: categoryLoading,
    refetch: getCategoryLK,
  } = useCategory.Lookup();
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
  const { mutate: checkIn } = useAccessory.CheckIn();
  const { mutate: checkOut } = useAccessory.CheckOut();

  const onCheckInHandler = (data: IEmployeeProduct) => {
    checkIn({
      productId: data.accessoryId as string,
      employeeId: data.employeeId,
      assaignDate: data.assignDate,
      notes: data.notes,
      quantity: data.quantity,
    });
  };

  const onHeadToModal = (accessory: IAccessory) => {
    const newEmployeeProduct = initial.EmployeeProduct;
    newEmployeeProduct.accessoryId = accessory.id;
    openCheckInModal(
      accessory.companyId,
      ["Employee"],
      newEmployeeProduct,
      onCheckInHandler
    );
  };

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
        <EmployeeProductSeats
          field="accessoryId"
          value={e.id}
          checkOut={checkOut}
        />
      ),
    },
    {
      title: "History",
      renderData: (e) => <HistoryLogs id={e.id} />,
    },
  ];

  const columns: MRT_ColumnDef<IAccessory>[] = [
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
      accessorKey: "imagePath",
      header: "Image",
      Cell: ({ row }) => {
        const image = getImage(row.original.imagePath);
        return (
          <Image
            src={image ? image : base_accessory}
            height={50}
            fit="contain"
            radius="md"
          />
        );
      },
    },
    {
      accessorKey: "tag",
      header: "Tag",
    },
    {
      accessorKey: "name",
      header: "Name",
      grow: false,
    },
    {
      accessorKey: "categoryId",
      header: "Category",
      filterVariant: "multi-select",
      Cell: ({ row }) => EntityCells.Category(row.original.categoryId),
      mantineFilterMultiSelectProps: () => ({
        data: categoryLoading ? [] : categoryLK,
        rightSection: categoryLoading ? <Loader size={16} /> : null,
        onDropdownOpen: getCategoryLK,
      }),
    },
    {
      accessorKey: "model",
      header: "Model No",
    },
    {
      header: "Check In",
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
      accessorKey: "quantity",
      header: "Total",
      Cell: ({ row }) => row.original.quantity || 0,
    },
    {
      accessorKey: "availableQuantity",
      header: "Available Quantity",
      Cell: ({ row }) => row.original.availableQuantity || 0,
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
      accessorKey: "modelNo",
      header: "Model No",
    },
    {
      accessorKey: "orderNo",
      header: "Order No",
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
      accessorKey: "notes",
      header: "Notes",
    },
  ];

  return { columns, cardColumns };
};
