import { IEmployeeProduct } from "@/interfaces/serverInterfaces";
import { openAssetCheckOutModal } from "@/utils/modalUtils";
import { EntityCells } from "@/cells/Entity";
import { useAsset } from "@/hooks/query";
import { MRT_ColumnDef } from "mantine-react-table";
import { Loader } from "@mantine/core";
import CheckOutButton from "@/cells/CheckOutBtnCell";

export const employeeAssetSeatColumns = () => {
  const {
    data: assetLK,
    isRefetching: assetLoading,
    refetch: getAssetLK,
  } = useAsset.Lookup();

  const columns: MRT_ColumnDef<IEmployeeProduct>[] = [
    {
      header: "Asset",
      accessorKey: "assetId",
      filterVariant: "multi-select",
      Cell: ({ row }) => EntityCells.Asset(row.original.assetId),
      mantineFilterMultiSelectProps: () => ({
        data: assetLoading ? [] : assetLK,
        rightSection: assetLoading ? <Loader size={16} /> : null,
        onDropdownOpen: getAssetLK,
      }),
    },
    {
      header: "Check Out",
      Cell: ({ row }) => {
        const checked = row.original;
        return (
          <CheckOutButton
            checkOut={() =>
              openAssetCheckOutModal({
                assetId: checked.assetId || "",
                employeeId: checked.employeeId,
                employeeProductId: checked.id,
                notes: checked.notes,
                productStatusId: checked.productStatusId || "",
              })
            }
          />
        );
      },
    },
  ];

  return {
    columns,
  };
};
