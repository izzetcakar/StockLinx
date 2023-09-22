import { useSelector } from "react-redux";
import { Column } from "../../components/gridTable/interfaces/interfaces";
import { NameComponent } from "../../components/customComponents/TableComponents";
import { RootState } from "../../redux/rootReducer";

export const useColumns = () => {
  const locations = useSelector((state: RootState) => state.location.locations);

  const columns: Column[] = [
    {
      dataField: "locationId",
      caption: "Location",
      renderComponent: (value: string) => NameComponent(value, locations),
    },
    {
      dataField: "name",
      caption: "Name",
    },
    {
      dataField: "contactName",
      caption: "Contact Name",
    },
    {
      dataField: "contactPhone",
      caption: "Contact Phone",
    },
    {
      dataField: "contactEmail",
      caption: "Contact Email",
    },
    {
      dataField: "website",
      caption: "Website",
    },
    {
      dataField: "fax",
      caption: "Fax",
    },
    {
      dataField: "notes",
      caption: "Notes",
    },
  ];
  return columns;
};
