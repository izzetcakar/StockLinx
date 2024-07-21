import { useLicense } from "@queryhooks";
import { useLocation as useRouterLocation } from "react-router-dom";
import { useColumns } from "./columns";
import EntityPanel from "@/components/entity/EntityPanel";

const License = () => {
  const { cardColumns } = useColumns();
  const { data: licenses } = useLicense.GetAll();
  const { state } = useRouterLocation();

  return (
    <EntityPanel
      data={state?.licenses || licenses || []}
      cardColumns={cardColumns}
    />
  );
};

export default License;
