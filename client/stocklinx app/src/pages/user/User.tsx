import EntityPanel from "@/components/entity/EntityPanel";
import { useLocation } from "react-router-dom";
import { useColumns } from "./columns";
import { useUser } from "@queryhooks";

const User = () => {
  const { state } = useLocation();
  const { cardColumns } = useColumns();
  const { data: users } = useUser.GetAll();

  return (
    <EntityPanel data={state?.users || users || []} cardColumns={cardColumns} />
  );
};

export default User;
