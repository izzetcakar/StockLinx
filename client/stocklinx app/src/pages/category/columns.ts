import { Column } from "devextreme/ui/data_grid";
import { ICategory } from "../../interfaces/interfaces";
import { IFormItem } from "../../components/generic/BaseDataGrid";
import { RootState } from "../../redux/rootReducer";
import { useSelector } from "react-redux";
import { Column as MyColumn } from "../../components/gridTable/interfaces/interfaces";
import { useMemo, useState } from "react";
import {
  useMantineReactTable,
  type MRT_ColumnDef,
  MRT_RowSelectionState,
} from "mantine-react-table";
import { fontAwesomeIcons } from "./Icons";

export const useColumns = () => {
  const categories = useSelector(
    (state: RootState) => state.category.categories
  );
  const companies = useSelector((state: RootState) => state.company.companies);
  const branches = useSelector((state: RootState) => state.branch.branches);
  const productTypes = [
    { id: 0, name: "Asset" },
    { id: 2, name: "License" },
    { id: 3, name: "Accessory" },
    { id: 5, name: "Consumable" },
    { id: 4, name: "Component" },
  ];
  const [rowSelection, setRowSelection] = useState<MRT_RowSelectionState>({});

  const getFilteredBranches = (options: { data?: ICategory; key?: string }) => {
    return {
      store: branches,
      filter: options.data ? ["companyId", "=", options.data.companyId] : null,
    };
  };

  const mantineColumns = useMemo<MRT_ColumnDef<ICategory>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Name",
        filterVariant: "text",
      },
      {
        accessorKey: "branchId",
        header: "Branch",
        filterVariant: "multi-select",
        accessorFn(originalRow) {
          return (
            branches.find((b) => b.id === originalRow.branchId)?.name || ""
          );
        },
        mantineFilterSelectProps: {
          data: branches.map((b) => b.name),
        },
        mantineFilterMultiSelectProps: {
          data: branches.map((b) => b.name),
        },
      },
      {
        accessorKey: "type",
        header: "Type",
        filterVariant: "multi-select",
        accessorFn(originalRow) {
          return (
            productTypes.find((b) => b.id === originalRow.type)?.name || ""
          );
        },
        mantineFilterMultiSelectProps: {
          data: productTypes.map((t) => ({
            value: t.id.toString(),
            label: t.name,
          })),
        },
      },
    ],
    []
  );

  const columns: MyColumn[] = [
    {
      dataField: "branchId",
      caption: "Branch",
      lookup: {
        dataSource: branches,
        valueExpr: "id",
        displayExpr: "name",
      },
      dataType: "string",
    },
    {
      dataField: "name",
      caption: "Name",
      dataType: "string",
    },
    {
      dataField: "type",
      caption: "Type",
      lookup: {
        dataSource: productTypes,
        valueExpr: "id",
        displayExpr: "name",
      },
      dataType: "number",
    },
  ];
  const devColumns: Column<ICategory>[] = [
    {
      dataField: "companyId",
      caption: "Company",
      lookup: {
        dataSource: companies,
        valueExpr: "id",
        displayExpr: "name",
      },
      setCellValue(newData, value) {
        newData.companyId = value;
        newData.branchId = "";
      },
      visible: false,
    },
    {
      dataField: "branchId",
      caption: "Branch",
      lookup: {
        dataSource: getFilteredBranches,
        valueExpr: "id",
        displayExpr: "name",
      },
      validationRules: [{ type: "required" }],
    },
    {
      dataField: "name",
      caption: "Name",
      validationRules: [{ type: "required" }],
    },
    {
      dataField: "type",
      caption: "Type",
      lookup: {
        dataSource: productTypes,
        valueExpr: "id",
        displayExpr: "name",
      },
      validationRules: [{ type: "required" }],
    },
  ];
  const formItems: IFormItem[] = [
    { dataField: "companyId" },
    { dataField: "branchId" },
    { dataField: "name" },
    { dataField: "type" },
  ];
  const table = useMantineReactTable({
    columns: mantineColumns,
    data: categories,
    initialState: { showColumnFilters: true },
    icons: fontAwesomeIcons,
    getRowId: (row) => row.id,
    onRowSelectionChange: setRowSelection,
    enableRowSelection: true,
    enableColumnActions: false,
    enableColumnOrdering: false,
    state: { rowSelection },
    mantinePaperProps: {
      shadow: "none",
    },
    mantineSelectCheckboxProps: {
      color: "gray",
      size: 18,
      radius: 2,
      width: 18,
    },
    mantineSelectAllCheckboxProps: {
      color: "gray",
      size: 18,
      radius: 2,
      width: 18,
    },
    mantineFilterTextInputProps: {
      placeholder: "(All)",
    },
  });

  return { table, columns, devColumns, formItems };
};
