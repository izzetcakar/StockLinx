import { EntityCells } from "@/cells/Entity";
import { useCompany, useUser } from "@queryhooks";
import { DataColumn } from "@/interfaces/gridTableInterfaces";
import { IPermission } from "@/interfaces/serverInterfaces";

export const useColumns = () => {
  const { refetch: getCompanyLK } = useCompany.Lookup();
  const { refetch: getUserLK } = useUser.Lookup();

  const columns: DataColumn[] = [
    {
      caption: "Company",
      dataField: "companyId",
      dataType: "string",
      lookup: { dataSource: getCompanyLK },
      renderComponent: (e) => EntityCells.Company((e as IPermission).companyId),
    },
    {
      caption: "User",
      dataField: "userId",
      dataType: "string",
      lookup: { dataSource: getUserLK },
      renderComponent: (e) => EntityCells.User((e as IPermission).userId),
    },
    {
      caption: "Date",
      dataField: "createdDate",
      dataType: "string",
    },
  ];

  return { columns };
};
