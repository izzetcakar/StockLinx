import EntityPanel from "@/components/entity/EntityPanel";
import { useLocation } from "react-router-dom";
import { useColumns } from "./columns";
import { useUser } from "@queryhooks";

const User = () => {
  const { state } = useLocation();
  const { cardColumns } = useColumns();
  const { data: users } = useUser.GetAll();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <EntityPanel
        data={state?.users || users || []}
        cardColumns={cardColumns}
      />
    </div>
  );
};

export default User;
