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
      data={
        locations?.filter((location) =>
          state?.locations?.map((e: any) => e.id).includes(location.id)
        ) ||
        locations ||
        []
      }
      cardColumns={cardColumns}
    />
  );
};

export default Location;
