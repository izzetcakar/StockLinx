import { useMemo } from 'react';
import {
  MantineReactTable,
  useMantineReactTable,
  type MRT_ColumnDef,
} from 'mantine-react-table';
import { ActionIcon, Loader, Menu, Tooltip  } from '@mantine/core';
import { IconUserCircle, IconSend, IconRefresh } from '@tabler/icons-react';
import { useAccessory, useCompany } from '@/hooks/query';
import { IAccessory } from '@/interfaces/serverInterfaces';
import { EntityCells } from '@/cells/Entity';

const Accessories = () => {
  const { data,isRefetching,refetch } = useAccessory.GetAll();
  const { data: companies,isRefetching:loading,refetch:getcom } = useCompany.Lookup();

  const columns = useMemo<MRT_ColumnDef<IAccessory>[]>(
    () => [
      {
        accessorKey: 'companyId',
        header: 'Company',
        Cell: ({ renderedCellValue }) => EntityCells.Company(renderedCellValue as string),
        filterVariant: 'select',
        mantineFilterSelectProps: () => ({
          data: loading ? [] : companies,
          onDropdownOpen: getcom,
          rightSection: loading && <Loader size={16} />
        }),
      },
      {
        accessorKey: "tag",
        header: "Tag",
      },
      {
        accessorKey: 'name',
        header: 'Name',
      }
    ],
    [loading, companies]
  );
  

  const table = useMantineReactTable<IAccessory>({
    columns,
    data : data || [],
    enableGlobalFilter:false,
    enableDensityToggle:false,
    enableColumnOrdering: true,
    enableFacetedValues: true,
    enableRowActions: true,
    enableRowSelection: true,
    state: {
      showLoadingOverlay:isRefetching,
      density: 'xs',
    },
    paginationDisplayMode: 'pages',
    positionToolbarAlertBanner: 'bottom',
    mantinePaginationProps: {
      radius: 'md',
      size: 'md',
    },
    renderTopToolbarCustomActions: () => (
      <Tooltip label="Refresh Data">
        <ActionIcon onClick={() => refetch()} variant='subtle' color='black'>
          <IconRefresh />
        </ActionIcon>
      </Tooltip>
    ),
    renderRowActionMenuItems: () => (
      <>
        <Menu.Item leftSection={<IconUserCircle />}>View Profile</Menu.Item>
        <Menu.Item leftSection={<IconSend />}>Send Email</Menu.Item>
      </>
    ),
  });

  return <MantineReactTable table={table}/>;
};

export default Accessories;