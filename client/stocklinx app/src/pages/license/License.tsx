import { useLicense } from "@queryhooks";
import { useLocation as useRouterLocation } from "react-router-dom";
import { useColumns } from "./columns";
import EntityPanel from "@/components/entity/EntityPanel";

const License = () => {
  const { cardColumns } = useColumns();
  const { data: licenses } = useLicense.GetAll();
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
        data={state?.licenses || licenses || []}
        cardColumns={cardColumns}
      />
    </div>
  );
};

export default License;
