import { IAssetProduct } from "@/interfaces/serverInterfaces";
import { openAssetProductCheckOutModal } from "@/utils/modalUtils";
import { AssetProductCheckOutDto } from "@/interfaces/dtos";
import { EntityCells } from "@/cells/Entity";
import { useAsset, useComponent, useLicense } from "@/hooks/query";
import { MRT_ColumnDef } from "mantine-react-table";
import { Loader } from "@mantine/core";
import CheckOutButton from "@/cells/CheckOutBtnCell";

export const assetSeatColumns = (
  assetCheckOut: (data: AssetProductCheckOutDto) => void
) => {
  const {
    data: assetLK,
    isRefetching: assetLoading,
    refetch: getAssetLK,
  } = useAsset.Lookup();
  const {
    data: licenseLK,
    isRefetching: licenseLoading,
    refetch: getLicenseLK,
  } = useLicense.Lookup();
  const {
    data: componentLK,
    isRefetching: componentLoading,
    refetch: getComponentLK,
  } = useComponent.Lookup();

  const columns: MRT_ColumnDef<IAssetProduct>[] = [
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
              openAssetProductCheckOutModal(
                {
                  assetProductId: checked.id,
                  quantity: checked.quantity,
                  notes: checked.notes,
                  assetId: checked.assetId,
                },
                assetCheckOut
              )
            }
          />
        );
      },
    },
  ];

  const assetCell: MRT_ColumnDef<IAssetProduct> = {
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

  const licenseCell: MRT_ColumnDef<IAssetProduct> = {
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

  const componentCell: MRT_ColumnDef<IAssetProduct> = {
    header: "Component",
    accessorKey: "componentId",
    filterVariant: "multi-select",
    Cell: ({ row }) => EntityCells.Component(row.original.componentId),
    mantineFilterMultiSelectProps: () => ({
      data: componentLoading ? [] : componentLK,
      rightSection: componentLoading ? <Loader size={16} /> : null,
      onDropdownOpen: getComponentLK,
    }),
  };

  return { columns, assetCell, licenseCell, componentCell };
};
