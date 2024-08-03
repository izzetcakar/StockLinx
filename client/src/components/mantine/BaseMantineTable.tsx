import {
  MantineReactTable,
  MRT_Row,
  useMantineReactTable,
} from "mantine-react-table";
import { ActionIcon, Flex, Menu } from "@mantine/core";
import {
  IconRefresh,
  IconEdit,
  IconPlus,
  IconTrash,
  IconCopy,
  IconLocationShare,
  IconTableExport,
} from "@tabler/icons-react";
import { openConfirmModal } from "@/components/gridTable/modals/modals";
import { jsPDF } from "jspdf";
import { mkConfig, generateCsv, download } from "export-to-csv";
import autoTable from "jspdf-autotable";

interface BaseMantineTableProps {
  data: undefined | any[];
  columns: any[];
  isLoading: boolean;
  disableSelection?: boolean;
  disablePagination?: boolean;
  wrapperStyle?: object;
  refetch: () => void;
  onAdd?: () => void;
  onCopy?: (value: any) => void;
  onUpdate?: (value: any) => void;
  onRemove?: (id: string) => void;
  onRemoveRange?: (ids: string[]) => void;
  onDetails?: (value: any[]) => void;
  getExportData?: (ids: string[]) => Promise<any[]>;
}

const csvConfig = mkConfig({
  fieldSeparator: ",",
  decimalSeparator: ".",
  useKeysAsHeaders: true,
});

const BaseMantineTable: React.FC<BaseMantineTableProps> = ({
  data,
  columns,
  disablePagination,
  isLoading,
  disableSelection,
  wrapperStyle,
  refetch,
  onAdd,
  onCopy,
  onUpdate,
  onRemove,
  onRemoveRange,
  onDetails,
  getExportData,
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

  const handleExportRowsPdf = async (rows: MRT_Row<any>[]) => {
    const doc = new jsPDF();
    let exportData = rows.map((row) => row.original);
    if (getExportData) {
      exportData = await getExportData(rows.map((row) => row.original?.id));
    }
    const tableHeaders = columns.map((c) => c.header);

    autoTable(doc, {
      head: [tableHeaders],
      body: exportData.map((row) => Object.values(row)),
      theme: "plain",
      alternateRowStyles: {
        overflow: "hidden",
        cellWidth: "wrap",
      },
    });

    doc.save("mrt-pdf-example.pdf");
  };

  const handleExportRowsCsv = async (rows: MRT_Row<any>[]) => {
    let exportData = rows.map((row) => row.original);
    if (getExportData) {
      exportData = await getExportData(rows.map((row) => row.original?.id));
    }
    const csv = generateCsv(csvConfig)(exportData);
    download(csvConfig)(csv);
  };

  const editable =
    onAdd || onUpdate || onCopy || onRemove || onRemoveRange ? true : false;

  const table = useMantineReactTable<any>({
    columns,
    data: data || [],
    enableGlobalFilter: false,
    enableDensityToggle: false,
    enableColumnOrdering: true,
    enablePinning: true,
    enableStickyHeader: true,
    enableStickyFooter: true,
    enableFacetedValues: true,
    enablePagination: !disablePagination,
    enableBottomToolbar: !disablePagination,
    enableRowVirtualization: disablePagination,
    enableRowActions: editable,
    enableRowSelection: !disableSelection,
    positionActionsColumn: "last",
    paginationDisplayMode: "pages",
    positionToolbarAlertBanner: "none",
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
    mantineTableContainerProps: {
      style: { height: disablePagination ? "500px" : "100%" },
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
    mantinePaperProps: {
      shadow: "0",
      radius: "md",
      withBorder: false,
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
          <IconRefresh size={18} />
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
        <Menu position="bottom-start" width="auto">
          <Menu.Target>
            <ActionIcon variant="subtle" color="black">
              <IconTableExport size={18} />
            </ActionIcon>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item
              disabled={table.getPrePaginationRowModel().rows.length === 0}
              onClick={() =>
                handleExportRowsCsv(table.getPrePaginationRowModel().rows)
              }
            >
              Export All Csv
            </Menu.Item>
            <Menu.Item
              disabled={table.getSelectedRowModel().rows.length === 0}
              onClick={() =>
                handleExportRowsCsv(table.getSelectedRowModel().rows)
              }
            >
              Export Selected Csv
            </Menu.Item>
            <Menu.Item
              disabled={table.getPrePaginationRowModel().rows.length === 0}
              onClick={() =>
                handleExportRowsPdf(table.getPrePaginationRowModel().rows)
              }
            >
              Export PDF
            </Menu.Item>
            <Menu.Item
              disabled={table.getSelectedRowModel().rows.length === 0}
              onClick={() =>
                handleExportRowsPdf(table.getSelectedRowModel().rows)
              }
            >
              Export Selected PDF
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
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

  return (
    <div
      aria-modal="true"
      style={{
        border: "1px solid #ebebebbc",
        maxHeight: "100%",
        maxWidth: "100%",
        borderRadius: "0.5rem",
        ...wrapperStyle,
      }}
    >
      <MantineReactTable table={table} />
    </div>
  );
};

export default BaseMantineTable;
