import { useColumns } from "./columns";
import { useDepartment } from "@queryhooks";
import { useLocation as useRouterLocation } from "react-router-dom";
import EntityPanel from "@/components/entity/EntityPanel";

const Department = () => {
  const { cardColumns } = useColumns();
  const { data: departments } = useDepartment.GetAll();
  const { state } = useRouterLocation();

  return (
    <EntityPanel
      data={state?.departments || departments || []}
      cardColumns={cardColumns}
    />
  );
};

export default Department;
