import { MantineReactTable, useMantineReactTable } from "mantine-react-table";
import { ActionIcon, Menu, Tooltip } from "@mantine/core";
import { IconSend, IconRefresh, IconEdit } from "@tabler/icons-react";
import { useAccessory } from "@/hooks/query";
import { IAccessory } from "@/interfaces/serverInterfaces";
import { useColumns } from "./columns";
import { openAccessoryModal } from "@/utils/modalUtils";

const Accessories = () => {
  const { columns } = useColumns();
  const { data, isRefetching, refetch } = useAccessory.GetAll();

  const table = useMantineReactTable<IAccessory>({
    columns,
    data: data || [],
    enableGlobalFilter: false,
    enableDensityToggle: false,
    enableColumnOrdering: true,
    enableFacetedValues: true,
    enableRowActions: true,
    enableRowSelection: true,
    state: {
      showLoadingOverlay: isRefetching,
      density: "xs",
      isLoading: isRefetching,
    },
    paginationDisplayMode: "pages",
    positionToolbarAlertBanner: "bottom",
    mantinePaginationProps: {
      radius: "md",
      size: "md",
    },
    renderTopToolbarCustomActions: () => (
      <Tooltip label="Refresh Data">
        <ActionIcon onClick={() => refetch()} variant="subtle" color="black">
          <IconRefresh />
        </ActionIcon>
      </Tooltip>
    ),
    renderRowActionMenuItems: ({ row }) => (
      <>
        <Menu.Item
          onClick={() => openAccessoryModal(row.original)}
          leftSection={<IconEdit />}
        >
          Edit
        </Menu.Item>
        <Menu.Item
          onClick={() => console.log(row.original)}
          leftSection={<IconSend />}
        >
          Show
        </Menu.Item>
      </>
    ),
  });

  return (
    <>
      <button onClick={() => console.log(data)}>show</button>
      <MantineReactTable table={table} />
    </>
  );
};

export default Accessories;
