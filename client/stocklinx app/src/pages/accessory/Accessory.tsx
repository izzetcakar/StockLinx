import { useColumns } from "./columns";
import { useAccessory } from "@queryhooks";
import { useParams, useLocation as useRouterLocation } from "react-router-dom";
import EntityPanel from "@/components/entity/EntityPanel";
import CenterLoader from "@/components/mantine/CenterLoader";

const Accessory = () => {
  const { cardColumns } = useColumns();
  const { data: accessories } = useAccessory.GetAll();
  const { state } = useRouterLocation();

  return (
    <EntityPanel
      data={
        accessories?.filter((accessory) =>
          state?.accessories?.map((e: any) => e.id).includes(accessory.id)
        ) ||
        accessories ||
        []
      }
      cardColumns={cardColumns}
    />
  );
};

const SingleAccessory = () => {
  const { id } = useParams();
  const { cardColumns } = useColumns();
  const { data: accessory, isRefetching } = useAccessory.Get(id as string);

  if (isRefetching) return <CenterLoader />;

  return <EntityPanel data={[accessory]} cardColumns={cardColumns} />;
};

export { Accessory, SingleAccessory };
