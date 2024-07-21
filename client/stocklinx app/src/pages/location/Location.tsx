import { useColumns } from "./columns";
import { useLocation } from "@queryhooks";
import { useLocation as useRouterLocation } from "react-router-dom";
import EntityPanel from "@/components/entity/EntityPanel";

const Location = () => {
  const { cardColumns } = useColumns();
  const { data: locations } = useLocation.GetAll();
  const { state } = useRouterLocation();

  return (
    <EntityPanel
      data={state?.locations || locations || []}
      cardColumns={cardColumns}
    />
  );
};

export default Location;
