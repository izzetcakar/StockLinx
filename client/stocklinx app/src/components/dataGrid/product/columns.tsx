import { EntityCells } from "@/cells/Entity";
import { useCategory, useCompany } from "@/hooks/query";
import {
  IProductCategoryCount,
  IProductCompanyCount,
} from "@/interfaces/serverInterfaces";
import { Loader } from "@mantine/core";
import { MRT_ColumnDef } from "mantine-react-table";

export const useColumns = () => {
  const {
    data: companyLK,
    isRefetching: companyLoading,
    refetch: getCompanyLK,
  } = useCompany.Lookup();
  const {
    data: categoryLK,
    isRefetching: categoryLoading,
    refetch: getCategoryLK,
  } = useCategory.Lookup();

  const companyProductColumns: MRT_ColumnDef<IProductCompanyCount>[] = [
    {
      header: "Company",
      accessorKey: "company",
      filterVariant: "multi-select",
      mantineFilterMultiSelectProps: () => ({
        data: companyLoading ? [] : companyLK,
        rightSection: companyLoading ? <Loader size={16} /> : null,
        onDropdownOpen: getCompanyLK,
      }),
    },
    {
      header: "Product Count",
      accessorKey: "productCount",
    },
    {
      header: "Assigned Count",
      accessorKey: "assignedCount",
    },
  ];

  const assetCategoryColumns: MRT_ColumnDef<IProductCategoryCount>[] = [
    {
      header: "Category",
      accessorKey: "categoryId",
      filterVariant: "multi-select",
      Cell: ({ row }) => EntityCells.Category(row.original.categoryId),
      mantineFilterMultiSelectProps: () => ({
        data: categoryLoading ? [] : categoryLK,
        rightSection: categoryLoading ? <Loader size={16} /> : null,
        onDropdownOpen: getCategoryLK,
      }),
    },
    {
      header: "Product",
      accessorKey: "productName",
      filterVariant: "multi-select",
      mantineFilterMultiSelectProps: () => ({
        data: [
          { value: "Accessory", label: "Accessory" },
          { value: "Asset", label: "Asset" },
          { value: "Consumable", label: "Consumable" },
          { value: "Component", label: "Component" },
          { value: "License", label: "License" },
        ],
      }),
    },
    {
      header: "Count",
      accessorKey: "productCount",
    },
  ];

  return {
    companyProductColumns,
    assetCategoryColumns,
  };
};
