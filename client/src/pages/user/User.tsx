import EntityPanel from "@/components/entity/EntityPanel";
import { useLocation } from "react-router-dom";
import { useColumns } from "./columns";
import { useUser } from "@queryhooks";

const User = () => {
  const { state } = useLocation();
  const { cardColumns } = useColumns();
  const { data: users } = useUser.GetAll();

  return (
    <EntityPanel
      data={
        users?.filter((user) =>
          state?.users?.map((e: any) => e.id).includes(user.id)
        ) || []
      }
      cardColumns={cardColumns}
    />
  );
};

export default User;
