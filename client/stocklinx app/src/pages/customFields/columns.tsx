import { useFieldSet, useFieldSetCustomField } from "@queryhooks";
import { ICustomField, IFieldSet } from "@interfaces/serverInterfaces";
import { MRT_ColumnDef } from "mantine-react-table";
import { Loader } from "@mantine/core";

export const useColumns = () => {
  const { data: fieldSetCustomFields } = useFieldSetCustomField.GetAll();
  const {
    data: fieldSetLK,
    isRefetching: fieldSetLoading,
    refetch: getFields,
  } = useFieldSet.Lookup();

  const fieldSetColumns: MRT_ColumnDef<IFieldSet>[] = [
    {
      accessorKey: "name",
      header: "Name",
    },
  ];

  const customFieldColumns: MRT_ColumnDef<ICustomField>[] = [
    {
      header: "FieldSets",
      filterVariant: "multi-select",
      accessorFn: (originalRow) => {
        return fieldSetCustomFields
          ?.filter((fc) => fc.customFieldId === originalRow.id)
          .map((fc) => fc.fieldSetId);
      },
      Cell: ({ row }) => {
        const foundFieldSetsIds = fieldSetCustomFields?.filter(
          (fc) => fc.customFieldId === row.original.id
        );
        const foundFieldSets = fieldSetLK?.filter((fs) =>
          foundFieldSetsIds?.map((f) => f.fieldSetId).includes(fs.value)
        );
        return foundFieldSets
          ? foundFieldSets.map((fs) => fs.label).join(", ")
          : null;
      },
      mantineFilterMultiSelectProps: () => ({
        data: fieldSetLK,
        rightSection: fieldSetLoading ? null : <Loader size={16} />,
        onDropdownOpen: () => getFields,
      }),
    },
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "type",
      header: "Type",
    },
    {
      accessorKey: "isRequired",
      header: "Is Required",
      filterVariant: "checkbox",
      Cell: ({ row }) => (row.original.isRequired ? "Yes" : "No"),
    },
    {
      accessorKey: "defaultValue",
      header: "Default Value",
    },
  ];

  return { fieldSetColumns, customFieldColumns };
};
