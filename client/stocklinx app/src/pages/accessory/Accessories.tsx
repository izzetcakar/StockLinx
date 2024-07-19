import { useMemo } from 'react';
import {
  MantineReactTable,
  useMantineReactTable,
  type MRT_ColumnDef,
} from 'mantine-react-table';
import { ActionIcon, Menu, Tooltip  } from '@mantine/core';
import { IconUserCircle, IconSend, IconRefresh } from '@tabler/icons-react';
import { useAccessory } from '@/hooks/query';
import { IAccessory } from '@/interfaces/serverInterfaces';
import { EntityCells } from '@/cells/Entity';

export type Employee = {
  companyId: string;
  supplierId: string | null;
  tag: string;
  name: string;
  orderNo: string | null;
  notes: string | null;
  purchaseCost: number | null;
  purchaseDate: Date | null;
  quantity: number;
  checkInCounter?: number | null;
  checkOutCounter?: number | null;
  availableQuantity?: number;
  manufacturerId: string | null;
  categoryId: string | null;
  imagePath: string | null;
  modelNo: string;
};



const Accessories = () => {
  const { data,isRefetching,refetch } = useAccessory.GetAll();

  const columns = useMemo<MRT_ColumnDef<IAccessory>[]>(
    () => [
      {
        accessorKey: 'companyId',
        header: 'Company',
        Cell: ({ renderedCellValue}) => EntityCells.Company(renderedCellValue as string),
      },
      {
        accessorKey:"tag",
        header: "Tag",
      },
      {
        accessorKey: 'name',
        header: 'Name',
      }
    ],
    [],
  );

  const table = useMantineReactTable({
    columns,
    data,
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

  return <MantineReactTable table={table} />;
};

export default Accessories;