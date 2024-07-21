import { useColumns } from "./columns";
import { useAsset } from "@queryhooks";
import { useLocation as useRouterLocation } from "react-router-dom";
import EntityPanel from "@/components/entity/EntityPanel";

const Asset = () => {
  const { cardColumns } = useColumns();
  const { data: assets } = useAsset.GetAll();
  const { state } = useRouterLocation();

  return (
    <EntityPanel
      data={state?.assets || assets || []}
      cardColumns={cardColumns}
    />
  );
};

export default Asset;
