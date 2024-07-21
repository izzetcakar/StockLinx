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
      data={state?.companies || companies || []}
      cardColumns={cardColumns}
    />
  );
};

export default Company;
