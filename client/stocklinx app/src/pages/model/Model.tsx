import { useColumns } from "./columns";
import { useModel } from "@queryhooks";
import { useLocation as useRouterLocation } from "react-router-dom";
import EntityPanel from "@/components/entity/EntityPanel";

const Model = () => {
  const { cardColumns } = useColumns();
  const { data: models } = useModel.GetAll();
  const { state } = useRouterLocation();

  return (
    <EntityPanel
      data={state?.models || models || []}
      cardColumns={cardColumns}
    />
  );
};

export default Model;
