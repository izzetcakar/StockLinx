import { useFieldSet } from "@/hooks/fieldSet";
import { useFieldSetCustomField } from "@/hooks/fieldSetCustomField";
import { DataColumn } from "@interfaces/gridTableInterfaces";
import { ICustomField } from "@interfaces/serverInterfaces";

export const useColumns = () => {
  const { data: fieldSets } = useFieldSet.GetAll();
  const { data: fieldSetCustomFields } = useFieldSetCustomField.GetAll();

  const fieldSetColumns: DataColumn[] = [
    {
      caption: "Name",
      dataField: "name",
      dataType: "string",
    },
  ];

  const customFieldColumns: DataColumn[] = [
    {
      caption: "FieldSets",
      dataField: "id",
      dataType: "action",
      renderComponent(e) {
        return fieldSets?.map((f) => {
          const foundFc = fieldSetCustomFields?.find(
            (fc) => fc.fieldSetId === (e as ICustomField).id
          );
          if (foundFc) {
            return <div key={f.id}>{f.name}</div>;
          }
        });
      },
    },
    {
      caption: "Name",
      dataField: "name",
      dataType: "string",
    },
    {
      caption: "Type",
      dataField: "type",
      dataType: "string",
    },
    {
      caption: "Is Required",
      dataField: "isRequired",
      dataType: "boolean",
    },
    {
      caption: "Default Value",
      dataField: "defaultValue",
      dataType: "string",
    },
    {
      caption: "Help Text",
      dataField: "helpText",
      dataType: "string",
    },
    {
      caption: "Format",
      dataField: "validationRegex",
      dataType: "string",
    },
    {
      caption: "Error Message",
      dataField: "validationText",
      dataType: "string",
    },
  ];

  return { fieldSetColumns, customFieldColumns };
};
