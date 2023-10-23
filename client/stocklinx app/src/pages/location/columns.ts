import { Column } from "devextreme/ui/data_grid";
import { ILocation } from "../../interfaces/interfaces";
import { IFormItem } from "../../components/generic/BaseDataGrid";

export const useColumns = () => {
  const devColumns: Column<ILocation>[] = [
    {
      dataField: "name",
      caption: "Name",
      validationRules: [{ type: "required" }],
    },
    {
      dataField: "state",
      caption: "State",
    },
    {
      dataField: "country",
      caption: "Country",
    },
    {
      dataField: "city",
      caption: "City",
    },
    //VISIBLE : FALSE
    {
      dataField: "address",
      caption: "Address",
      visible: false,
    },
    {
      dataField: "address2",
      caption: "Address2",
      visible: false,
    },
    {
      dataField: "currency",
      caption: "Currency",
      visible: false,
    },
  ];
  const formItems: IFormItem[] = [
    { dataField: "name" },
    { dataField: "country" },
    { dataField: "state" },
    { dataField: "city" },
    { dataField: "address" },
    { dataField: "address2" },
    { dataField: "zipCode" },
    { dataField: "currency" },
    { dataField: "notes" },
  ];

  return { devColumns, formItems };
};
