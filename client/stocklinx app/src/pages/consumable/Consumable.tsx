import { useColumns } from "./columns";
import { useConsumable } from "@queryhooks";
import { useLocation as useRouterLocation } from "react-router-dom";
import EntityPanel from "@/components/entity/EntityPanel";

const Consumable = () => {
  const { cardColumns } = useColumns();
  const { data: consumables } = useConsumable.GetAll();
  const { state } = useRouterLocation();

  return (
    <EntityPanel
      data={state?.consumables || consumables || []}
      cardColumns={cardColumns}
    />
  );
};

export default Consumable;
