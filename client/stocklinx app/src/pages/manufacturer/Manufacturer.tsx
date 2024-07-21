import { useColumns } from "./columns";
import { useManufacturer } from "@queryhooks";
import { useLocation as useRouterLocation } from "react-router-dom";
import EntityPanel from "@/components/entity/EntityPanel";

const Manufacturer = () => {
  const { cardColumns } = useColumns();
  const { data: manufacturers } = useManufacturer.GetAll();
  const { state } = useRouterLocation();

  return (
    <EntityPanel
      data={state?.manufacturers || manufacturers || []}
      cardColumns={cardColumns}
    />
  );
};

export default Manufacturer;
