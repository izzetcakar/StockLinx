import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import {
  Column,
  ExcelColumn,
} from "../../components/gridTable/interfaces/interfaces";

export const useColumns = () => {
  const locations = useSelector((state: RootState) => state.location.locations);

  const columns: Column[] = [
    {
      dataField: "name",
      caption: "Name",
      dataType: "string",
    },
    {
      dataField: "locationId",
      caption: "Location",
      lookup: {
        dataSource: locations,
        valueExpr: "id",
        displayExpr: "name",
      },
      dataType: "string",
    },
    {
      dataField: "contactName",
      caption: "Contact Name",
      dataType: "string",
    },
    {
      dataField: "contactEmail",
      caption: "Email",
      dataType: "string",
    },
    {
      dataField: "contactPhone",
      caption: "Phone",
      dataType: "string",
    },
    {
      dataField: "website",
      caption: "Website",
      dataType: "string",
    },
    {
      dataField: "fax",
      caption: "Fax",
      dataType: "string",
    },
    {
      dataField: "notes",
      caption: "Notes",
      dataType: "string",
    },
    // INVISIBLE COLUMNS
    {
      dataField: "imagePath",
      caption: "Image",
      dataType: "string",
      visible: false,
    },
  ];

  const excelColumns: ExcelColumn[] = [
    {
      dataField: "name",
      validate(value) {
        return value !== null;
      },
      errorText: "Name is required",
    },
    {
      dataField: "locationId",
      nullable: true,
    },
    {
      dataField: "contactName",
    },
    {
      dataField: "contactEmail",
    },
    {
      dataField: "contactPhone",
    },
    {
      dataField: "website",
    },
    {
      dataField: "fax",
    },
    {
      dataField: "imagePath",
    },
    {
      dataField: "notes",
    },
  ];

  return { columns, excelColumns };
};
