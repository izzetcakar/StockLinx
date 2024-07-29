import { useColumns } from "./columns";
import { useConsumable } from "@queryhooks";
import { useParams, useLocation as useRouterLocation } from "react-router-dom";
import EntityPanel from "@/components/entity/EntityPanel";
import CenterLoader from "@/components/mantine/CenterLoader";

const Consumable = () => {
  const { cardColumns } = useColumns();
  const { data: consumables } = useConsumable.GetAll();
  const { state } = useRouterLocation();

  return (
    <EntityPanel
      data={
        consumables?.filter((consumable) =>
          state?.consumables?.map((e: any) => e.id).includes(consumable.id)
        ) || []
      }
      cardColumns={cardColumns}
    />
  );
};

const SingleConsumable = () => {
  const { id } = useParams();
  const { cardColumns } = useColumns();
  const { data: consumable, isRefetching } = useConsumable.Get(id as string);

  if (isRefetching) return <CenterLoader />;

  return <EntityPanel data={[consumable]} cardColumns={cardColumns} />;
};

export { Consumable, SingleConsumable };
