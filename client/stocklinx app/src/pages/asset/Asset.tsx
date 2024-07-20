import { useColumns } from "./columns";
import { useAsset } from "@queryhooks";
import { useLocation as useRouterLocation } from "react-router-dom";
import EntityPanel from "@/components/entity/EntityPanel";

const Asset = () => {
  const { cardColumns } = useColumns();
  const { data: assets } = useAsset.GetAll();
  const { state } = useRouterLocation();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <EntityPanel
        data={state?.assets || assets || []}
        cardColumns={cardColumns}
      />
    </div>
  );
};

export default Asset;
