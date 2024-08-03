import { IEmployeeProduct } from "@/interfaces/serverInterfaces";
import { openEmployeeProductCheckOutModal } from "@/utils/modalUtils";
import { EmployeeProductCheckOutDto } from "@/interfaces/dtos";
import { EntityCells } from "@/cells/Entity";
import {
  useAccessory,
  useAsset,
  useConsumable,
  useEmployee,
  useLicense,
} from "@/hooks/query";
import { MRT_ColumnDef } from "mantine-react-table";
import { Loader } from "@mantine/core";
import CheckOutButton from "@/cells/CheckOutBtnCell";

export const employeeSeatColumns = (
  assetCheckOut: (data: EmployeeProductCheckOutDto) => void
) => {
  const {
    data: accessoryLK,
    isRefetching: accessoryLoading,
    refetch: getAccessoryLK,
  } = useAccessory.Lookup();
  const {
    data: assetLK,
    isRefetching: assetLoading,
    refetch: getAssetLK,
  } = useAsset.Lookup();
  const {
    data: consumableLK,
    isRefetching: consumableLoading,
    refetch: getConsumableLK,
  } = useConsumable.Lookup();
  const {
    data: employeeLK,
    isRefetching: employeeLoading,
    refetch: getEmployeeLK,
  } = useEmployee.Lookup();
  const {
    data: licenseLK,
    isRefetching: licenseLoading,
    refetch: getLicenseLK,
  } = useLicense.Lookup();

  const columns: MRT_ColumnDef<IEmployeeProduct>[] = [
    {
      header: "Seat",
      Cell: ({ row }) => {
        return "Seat " + (row.index + 1);
      },
    },
    {
      header: "Quantity",
      accessorKey: "quantity",
    },
    {
      header: "Check Out",
      Cell: ({ row }) => {
        const checked = row.original;
        return (
          <CheckOutButton
            checkOut={() =>
              openEmployeeProductCheckOutModal(
                {
                  employeeProductId: checked.id,
                  employeeId: checked.employeeId,
                  quantity: checked.quantity,
                  notes: checked.notes,
                },
                assetCheckOut
              )
            }
          />
        );
      },
    },
  ];

  const accessoryCell: MRT_ColumnDef<IEmployeeProduct> = {
    header: "Accessory",
    accessorKey: "accessoryId",
    filterVariant: "multi-select",
    Cell: ({ row }) => EntityCells.Accessory(row.original.accessoryId),
    mantineFilterMultiSelectProps: () => ({
      data: accessoryLoading ? [] : accessoryLK,
      rightSection: accessoryLoading ? <Loader size={16} /> : null,
      onDropdownOpen: getAccessoryLK,
    }),
  };

  const assetCell: MRT_ColumnDef<IEmployeeProduct> = {
    header: "Asset",
    accessorKey: "assetId",
    filterVariant: "multi-select",
    Cell: ({ row }) => EntityCells.Asset(row.original.assetId),
    mantineFilterMultiSelectProps: () => ({
      data: assetLoading ? [] : assetLK,
      rightSection: assetLoading ? <Loader size={16} /> : null,
      onDropdownOpen: getAssetLK,
    }),
  };

  const consumableCell: MRT_ColumnDef<IEmployeeProduct> = {
    header: "Consumable",
    accessorKey: "consumableId",
    filterVariant: "multi-select",
    Cell: ({ row }) => EntityCells.Consumable(row.original.consumableId),
    mantineFilterMultiSelectProps: () => ({
      data: consumableLoading ? [] : consumableLK,
      rightSection: consumableLoading ? <Loader size={16} /> : null,
      onDropdownOpen: getConsumableLK,
    }),
  };

  const employeeCell: MRT_ColumnDef<IEmployeeProduct> = {
    header: "Employee",
    accessorKey: "employeeId",
    filterVariant: "multi-select",
    Cell: ({ row }) => EntityCells.Employee(row.original.employeeId),
    mantineFilterMultiSelectProps: () => ({
      data: employeeLoading ? [] : employeeLK,
      rightSection: employeeLoading ? <Loader size={16} /> : null,
      onDropdownOpen: getEmployeeLK,
    }),
  };

  const licenseCell: MRT_ColumnDef<IEmployeeProduct> = {
    header: "License",
    accessorKey: "licenseId",
    filterVariant: "multi-select",
    Cell: ({ row }) => EntityCells.License(row.original.licenseId),
    mantineFilterMultiSelectProps: () => ({
      data: licenseLoading ? [] : licenseLK,
      rightSection: licenseLoading ? <Loader size={16} /> : null,
      onDropdownOpen: getLicenseLK,
    }),
  };

  return {
    columns,
    accessoryCell,
    assetCell,
    consumableCell,
    employeeCell,
    licenseCell,
  };
};
