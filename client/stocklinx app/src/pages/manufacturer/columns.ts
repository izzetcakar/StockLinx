import { Column } from "devextreme/ui/data_grid";
import { Column as MyColumn } from "../../components/gridTable/interfaces/interfaces";
import { IManufacturer } from "../../interfaces/interfaces";

export const useColumns = () => {
  const columns: MyColumn[] = [
    {
      dataField: "name",
      caption: "Name",
    },
    {
      dataField: "supportPhone",
      caption: "Support Phone",
    },
    {
      dataField: "supportEmail",
      caption: "Support Email",
    },
    {
      dataField: "website",
      caption: "Website",
    },
  ];
  const devColumns: Column<IManufacturer>[] = [
    {
      dataField: "name",
      caption: "Name",
    },
    {
      dataField: "supportPhone",
      caption: "Support Phone",
    },
    {
      dataField: "supportEmail",
      caption: "Support Email",
    },
    {
      dataField: "website",
      caption: "Website",
    },
  ];
  return { columns, devColumns };
};
