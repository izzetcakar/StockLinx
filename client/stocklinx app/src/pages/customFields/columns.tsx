import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { BaseColumn } from "@interfaces/gridTableInterfaces";
import { ICustomField } from "@interfaces/serverInterfaces";

export const useColumns = () => {
  const fieldSets = useSelector((state: RootState) => state.fieldSet.fieldSets);
  const fieldSetCustomFields = useSelector(
    (state: RootState) => state.fieldSetCustomField.fieldSetCustomFields
  );

  const fieldSetColumns: BaseColumn[] = [
    {
      caption: "Name",
      dataField: "name",
      dataType: "string",
    },
  ];

  const customFieldColumns: BaseColumn[] = [
    {
      caption: "FieldSets",
      dataField: "id",
      dataType: "action",
      renderComponent(e) {
        return fieldSets.map((f) => {
          const foundFc = fieldSetCustomFields.find(
            (fc) => fc.fieldSetId === (e as ICustomField).id
          );
          if (foundFc !== undefined) {
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
