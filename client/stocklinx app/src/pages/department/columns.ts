import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { Column } from "../../components/gridTable/interfaces/interfaces";
import { NameComponent } from "../../components/customComponents/TableComponents";

export const useColumns = () => {
  const companies = useSelector((state: RootState) => state.company.companies);
  const locations = useSelector((state: RootState) => state.location.locations);

  const columns: Column[] = [
    {
      dataField: "companyId",
      caption: "Company",
      renderComponent: (value: string) => NameComponent(value, companies),
    },
    {
      dataField: "locationId",
      caption: "Location",
      renderComponent: (value: string) => NameComponent(value, locations),
    },
    {
      dataField: "managerId",
      caption: "Manager",
    },
    {
      dataField: "name",
      caption: "Name",
    },
    {
      dataField: "notes",
      caption: "Notes",
    },
  ];
  return columns;
};
