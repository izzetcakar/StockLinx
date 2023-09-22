import { Column } from "../../components/gridTable/interfaces/interfaces";

export const useColumns = () => {
  const columns: Column[] = [
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
  return columns;
};
