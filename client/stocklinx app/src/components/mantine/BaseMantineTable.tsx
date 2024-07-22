import { MantineReactTable, useMantineReactTable } from "mantine-react-table";
import { ActionIcon, Flex } from "@mantine/core";
import {
  IconRefresh,
  IconEdit,
  IconPlus,
  IconTrash,
  IconCopy,
  IconLocationShare,
} from "@tabler/icons-react";
import { IAccessory } from "@/interfaces/serverInterfaces";
import { openConfirmModal } from "@/components/gridTable/modals/modals";

interface BaseMantineTableProps {
  data: undefined | any[];
  columns: any[];
  isLoading: boolean;
  refetch: () => void;
  onAdd?: () => void;
  onCopy?: (value: any) => void;
  onUpdate?: (value: any) => void;
  onRemove?: (id: string) => void;
  onRemoveRange?: (ids: string[]) => void;
  onDetails?: (value: any[]) => void;
}

const BaseMantineTable: React.FC<BaseMantineTableProps> = ({
  data,
  columns,
  isLoading,
  refetch,
  onAdd,
  onCopy,
  onUpdate,
  onRemove,
  onRemoveRange,
  onDetails,
}) => {
  const copyHandler = (value: any) => {
    if (!onCopy) return;
    onCopy(value);
  };

  const removeHandler = (id: string) => {
    if (!onRemove) return;
    openConfirmModal("Remove", "Are you sure want to remove this item?", () =>
      onRemove(id)
    );
  };

  const removeRangeHandler = (selectedKeys: string[]) => {
    if (!onRemoveRange) return;
    if (selectedKeys.length === 0) return;
    openConfirmModal(
      "Remove Range",
      "Are you sure want to remove selected items?",
      () => onRemoveRange(selectedKeys)
    );
  };

  const editable =
    onAdd || onUpdate || onCopy || onRemove || onRemoveRange ? true : false;

  const table = useMantineReactTable<IAccessory>({
    columns,
    data: data || [],
    enableGlobalFilter: false,
    enableDensityToggle: false,
    enableColumnOrdering: true,
    enablePinning: true,
    enableStickyHeader: true,
    enableStickyFooter: true,
    enableFacetedValues: true,
    enableRowActions: editable,
    enableRowSelection: editable,
    positionActionsColumn: "last",
    paginationDisplayMode: "pages",
    positionToolbarAlertBanner: "bottom",
    displayColumnDefOptions: {
      "mrt-row-actions": {
        header: "",
      },
      "mrt-row-select": {
        size: 0,
        minSize: 0,
        maxSize: 0,
        grow: 0,
      },
    },
    mantineSelectCheckboxProps: { radius: "sm" },
    state: {
      showLoadingOverlay: isLoading,
      density: "xs",
      isLoading: isLoading,
    },
    mantinePaginationProps: {
      radius: "md",
      size: "sm",
    },
    defaultColumn: {
      size: 20,
    },
    mantineTableBodyRowProps: ({ row }) => ({
      onClick: row.getToggleSelectedHandler(),
      sx: { cursor: "pointer" },
    }),
    renderTopToolbarCustomActions: ({ table }) => (
      <Flex align="center" gap="sm">
        <ActionIcon onClick={() => refetch()} variant="subtle" color="black">
          <IconRefresh size={18}/>
        </ActionIcon>
        {onAdd ? (
          <ActionIcon onClick={() => onAdd()} variant="subtle" color="black">
            <IconPlus size={18} />
          </ActionIcon>
        ) : null}
        {onRemoveRange ? (
          <ActionIcon
            onClick={() =>
              removeRangeHandler(
                table
                  .getSelectedRowModel()
                  .rows.map((row) => row.original)
                  .map((row) => row.id)
              )
            }
            variant="subtle"
            color="black"
          >
            <IconTrash size={18} />
          </ActionIcon>
        ) : null}
        {onDetails && table.getSelectedRowModel().rows.length >= 1 ? (
          <ActionIcon
            variant="subtle"
            color="black"
            onClick={() =>
              onDetails(
                table.getSelectedRowModel().rows.map((row) => row.original)
              )
            }
          >
            <IconLocationShare size={18} />
          </ActionIcon>
        ) : null}
      </Flex>
    ),
    renderRowActions: ({ row }) => (
      <Flex gap={5} justify="flex-end">
        {onUpdate ? (
          <ActionIcon
            onClick={() => onUpdate(row.original)}
            variant="subtle"
            color="black"
          >
            <IconEdit size={15} />
          </ActionIcon>
        ) : null}
        {onCopy ? (
          <ActionIcon
            onClick={() => copyHandler(row.original)}
            variant="subtle"
            color="black"
          >
            <IconCopy size={15} />
          </ActionIcon>
        ) : null}
        {onRemove ? (
          <ActionIcon
            onClick={() => removeHandler(row.original.id)}
            variant="subtle"
            color="black"
          >
            <IconTrash size={15} />
          </ActionIcon>
        ) : null}
      </Flex>
    ),
  });

  return <MantineReactTable table={table} />;
};

export default BaseMantineTable;
