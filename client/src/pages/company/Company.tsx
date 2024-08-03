import { useColumns } from "./columns";
import { useCompany } from "@queryhooks";
import { useLocation as useRouterLocation } from "react-router-dom";
import EntityPanel from "@/components/entity/EntityPanel";

const Company = () => {
  const { cardColumns } = useColumns();
  const { data: companies } = useCompany.GetAll();
  const { state } = useRouterLocation();

  return (
    <EntityPanel
      data={
        companies?.filter((company) =>
          state?.companies?.map((e: any) => e.id).includes(company.id)
        ) || []
      }
      cardColumns={cardColumns}
    />
  );
};

export default Company;
