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
      data={
        manufacturers?.filter((manufacturer) =>
          state?.manufacturers?.map((e: any) => e.id).includes(manufacturer.id)
        ) || []
      }
      cardColumns={cardColumns}
    />
  );
};

export default Manufacturer;
