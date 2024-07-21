import { useColumns } from "./columns";
import { useAccessory } from "@queryhooks";
import { useLocation as useRouterLocation } from "react-router-dom";
import EntityPanel from "@/components/entity/EntityPanel";

const Accessory = () => {
  const { cardColumns } = useColumns();
  const { data: accessories } = useAccessory.GetAll();
  const { state } = useRouterLocation();

  return (
    <EntityPanel
      data={state?.accessories || accessories || []}
      cardColumns={cardColumns}
    />
  );
};

export default Accessory;
