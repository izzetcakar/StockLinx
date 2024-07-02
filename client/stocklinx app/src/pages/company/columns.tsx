import { DataColumn } from "@interfaces/gridTableInterfaces";
import { ICompany } from "@interfaces/serverInterfaces";
import { useLocation } from "@/hooks/query/location";
import { EntityCells } from "@/cells/Entity";
import { EntityCardColumn } from "@/interfaces/clientInterfaces";
import HistoryLogs from "@/components/dataGrid/customLog/HistoryLogs";
import CompanyForm from "@/forms/company/CompanyForm";

export const useColumns = () => {
  const { refetch: fetchLocationLK } = useLocation.Lookup();

  const columns: DataColumn[] = [
    {
      dataField: "name",
      caption: "Name",
      dataType: "string",
    },
    {
      caption: "Location",
      dataField: "locationId",
      dataType: "string",
      lookup: {
        dataSource: fetchLocationLK,
      },
      renderComponent: (e) => EntityCells.Location((e as ICompany).locationId),
    },
    {
      dataField: "email",
      caption: "Email",
      dataType: "string",
    },
  ];

  const cardColumns: EntityCardColumn[] = [
    {
      title: (company: ICompany) => {
        return (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "5px",
            }}
          >
            <div>Tag : {company.tag}</div>
            <div>Name : {company.name}</div>
          </div>
        );
      },
      renderData: (e) => <CompanyForm company={e as ICompany} />,
    },
    {
      title: "History",
      renderData: (e) => <HistoryLogs id={e.id} />,
    },
  ];

  return { columns, cardColumns };
};
