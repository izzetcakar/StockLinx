import { MantineReactTable, useMantineReactTable } from "mantine-react-table";
import { ActionIcon, Flex } from "@mantine/core";
import {
  IconRefresh,
  IconEdit,
  IconPlus,
  IconTrash,
  IconCopy,
} from "@tabler/icons-react";
import { IAccessory } from "@/interfaces/serverInterfaces";
import { openConfirmModal } from "@/components/gridTable/modals/modals";

interface BaseMantineTableProps {
  data: undefined | any[];
  columns: any[];
  isLoading: boolean;
  refetch: () => void;
  onAdd: () => void;
  onCopy?: (value: any) => void;
  onUpdate?: (value: any) => void;
  onRemove: (id: string) => void;
  onRemoveRange: (ids: string[]) => void;
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
}) => {
  const copyHandler = (value: any) => {
    if (!onCopy) return;
    onCopy(value);
  };

  const removeHandler = (id: string) => {
    openConfirmModal("Remove", "Are you sure want to remove this item?", () =>
      onRemove(id)
    );
  };

  const removeRangeHandler = (selectedKeys: string[]) => {
    if (selectedKeys.length === 0) return;
    openConfirmModal(
      "Remove Range",
      "Are you sure want to remove selected items?",
      () => onRemoveRange(selectedKeys)
    );
  };

  const table = useMantineReactTable<IAccessory>({
    columns,
    data: data || [],
    enableGlobalFilter: false,
    enableDensityToggle: false,
    enableColumnOrdering: true,
    enableFacetedValues: true,
    enableRowActions: true,
    enableRowSelection: true,
    paginationDisplayMode: "pages",
    positionToolbarAlertBanner: "bottom",
    enablePinning: true,
    state: {
      showLoadingOverlay: isLoading,
      density: "xs",
      isLoading: isLoading,
    },
    mantinePaginationProps: {
      radius: "md",
      size: "sm",
    },
    renderTopToolbarCustomActions: ({ table }) => (
      <Flex align="center" gap="sm">
        <ActionIcon onClick={() => refetch()} variant="subtle" color="black">
          <IconRefresh />
        </ActionIcon>
        <ActionIcon onClick={() => onAdd()} variant="subtle" color="black">
          <IconPlus />
        </ActionIcon>
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
          <IconTrash />
        </ActionIcon>
      </Flex>
    ),
    renderRowActions: ({ row }) => (
      <Flex gap={5}>
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
        <ActionIcon
          onClick={() => removeHandler(row.original.id)}
          variant="subtle"
          color="black"
        >
          <IconTrash size={15} />
        </ActionIcon>
      </Flex>
    ),
  });

  return <MantineReactTable table={table} />;
};

export default BaseMantineTable;
