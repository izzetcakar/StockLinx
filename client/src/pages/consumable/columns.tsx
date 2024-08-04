import { IConsumable, IEmployeeProduct } from "@interfaces/serverInterfaces";
import { Button, Loader } from "@mantine/core";
import { openCheckInModal } from "@/utils/modalUtils";
import {
  useConsumable,
  useCategory,
  useCompany,
  useSupplier,
  useManufacturer,
} from "@queryhooks";
import { EntityCells } from "@/cells/Entity";
import { useInitial } from "@/hooks/initial/useInitial";
import { MRT_ColumnDef } from "mantine-react-table";
import { CategoryType } from "@/interfaces/enums";
import { EntityCardColumn } from "@/interfaces/clientInterfaces";
import { formatDate } from "@/utils/dateUtils";
import ConsumableForm from "@/forms/consumable/ConsumableForm";
import HistoryLogs from "@/components/dataGrid/customLog/HistoryLogs";
import EmployeeProductSeats from "@/components/dataGrid/productseats/EmployeeProductSeats";

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
    refetch: getSupplier,
  } = useSupplier.Lookup();
  const {
    data: manufacturerLK,
    isRefetching: manufacturerLoading,
    refetch: getManufacturerLK,
  } = useManufacturer.Lookup();
  const { mutate: checkIn } = useConsumable.CheckIn();
  const { mutate: checkOut } = useConsumable.CheckOut();

  const onCheckInHandler = (data: IEmployeeProduct) => {
    checkIn({
      productId: data.consumableId as string,
      employeeId: data.employeeId,
      assaignDate: data.assignDate,
      notes: data.notes,
      quantity: data.quantity,
    });
  };

  const onHeadToModal = (consumable: IConsumable) => {
    const newEmployeeProduct = initial.EmployeeProduct;
    newEmployeeProduct.consumableId = consumable.id;
    openCheckInModal(
      consumable.companyId,
      ["Employee"],
      newEmployeeProduct,
      onCheckInHandler
    );
  };

  const columns: MRT_ColumnDef<IConsumable>[] = [
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
      header: "Tag",
    },
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "categoryId",
      header: "Category",
      filterVariant: "multi-select",
      Cell: ({ row }) => EntityCells.Category(row.original.categoryId),
      mantineFilterMultiSelectProps: () => ({
        data:
          categories
            ?.filter((category) => category.type === CategoryType.CONSUMABLE)
            .map((category) => ({
              value: category.id,
              label: category.name,
            })) || [],
        rightSection: categoryLoading ? <Loader size={16} /> : null,
        onDropdownOpen: getCategories,
      }),
    },
    {
      accessorKey: "modelNo",
      header: "Model No",
    },
    {
      accessorKey: "itemNo",
      header: "Item No",
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
      accessorKey: "orderNo",
      header: "Order Number",
    },
    {
      accessorKey: "purchaseDate",
      header: "Purchase Date",
      accessorFn: (originalRow) =>
        originalRow.purchaseDate ? new Date(originalRow.purchaseDate) : "",
      filterVariant: "date-range",
      Cell: ({ row }) => formatDate(row.original.purchaseDate),
    },
    {
      accessorKey: "purchaseCost",
      header: "Purchase Cost",
      filterVariant: "range-slider",
    },
    {
      header: "Checkin",
      filterVariant: "checkbox",
      accessorFn: (originalRow) =>
        originalRow.availableQuantity && originalRow.availableQuantity > 0
          ? "true"
          : "false",
      Cell: ({ row }) => {
        const consumable = row.original;
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
              onClick={() => onHeadToModal(consumable)}
            >
              Check In
            </Button>
          </div>
        );
      },
    },
    {
      accessorKey: "supplierId",
      header: "Supplier",
      filterVariant: "multi-select",
      Cell: ({ row }) => EntityCells.Supplier(row.original.supplierId),
      mantineFilterMultiSelectProps: () => ({
        data: supplierLoading ? [] : supplierLK,
        rightSection: supplierLoading ? <Loader size={16} /> : null,
        onDropdownOpen: getSupplier,
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
      accessorKey: "notes",
      header: "Notes",
    },
  ];

  const cardColumns: EntityCardColumn[] = [
    {
      title: (consumable: IConsumable) => {
        return (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "5px",
            }}
          >
            <div>Tag : {consumable.tag}</div>
            <div>Name : {consumable.name}</div>
          </div>
        );
      },
      renderData: (e) => <ConsumableForm consumable={e as IConsumable} />,
    },
    {
      title: "Seats",
      renderData: (e) => (
        <EmployeeProductSeats
          field="consumableId"
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

  return { columns, cardColumns };
};
