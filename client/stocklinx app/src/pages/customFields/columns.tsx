import { useFieldSet, useFieldSetCustomField } from "@queryhooks";
import { ICustomField, IFieldSet } from "@interfaces/serverInterfaces";
import { MRT_ColumnDef } from "mantine-react-table";
import { Loader } from "@mantine/core";

export const useColumns = () => {
  const {
    data: fieldSets,
    isRefetching: fieldSetLoading,
    refetch: getFields,
  } = useFieldSet.GetAll();
  const {
    data: fieldSetCustomFields,
    isRefetching: fieldSetCustomFieldLoading,
    refetch: getFieldSetCustomFields,
  } = useFieldSetCustomField.GetAll();

  const fieldSetColumns: MRT_ColumnDef<IFieldSet>[] = [
    {
      accessorKey: "name",
      header: "Name",
    },
  ];

  const customFieldColumns: MRT_ColumnDef<ICustomField>[] = [
    {
      accessorKey: "fieldSetId",
      header: "FieldSets",
      filterVariant: "multi-select",
      Cell: ({ row }) => {
        return fieldSets?.map((f) => {
          const foundFc = fieldSetCustomFields?.find(
            (fc) => fc.fieldSetId === (row.original as ICustomField).id
          );
          if (foundFc) {
            return f.name;
          }
        });
      },
      mantineFilterMultiSelectProps: () => ({
        data: fieldSets,
        rightSection:
          fieldSetLoading || fieldSetCustomFieldLoading ? null : (
            <Loader size={16} />
          ),
        onDropdownOpen: () => {
          getFields();
          getFieldSetCustomFields();
        },
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
    },
    {
      accessorKey: "defaultValue",
      header: "Default Value",
    },
    {
      accessorKey: "helpText",
      header: "Help Text",
    },
    {
      accessorKey: "validationRegex",
      header: "Format",
    },
    {
      accessorKey: "validationText",
      header: "Error Message",
    },
  ];

  return { fieldSetColumns, customFieldColumns };
};
