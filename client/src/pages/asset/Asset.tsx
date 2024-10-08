import { useColumns } from "./columns";
import { useAsset } from "@queryhooks";
import { useParams, useLocation as useRouterLocation } from "react-router-dom";
import EntityPanel from "@/components/entity/EntityPanel";
import CenterLoader from "@/components/mantine/CenterLoader";

const Asset = () => {
  const { cardColumns } = useColumns();
  const { data: assets } = useAsset.GetAll();
  const { state } = useRouterLocation();

  return (
    <EntityPanel
      data={
        assets?.filter((asset) =>
          state?.assets?.map((e: any) => e.id).includes(asset.id)
        ) || []
      }
      cardColumns={cardColumns}
    />
  );
};

const SingleAsset = () => {
  const { id } = useParams();
  const { cardColumns } = useColumns();
  const { data: asset, isRefetching } = useAsset.Get(id as string);

  if (isRefetching) return <CenterLoader />;

  return <EntityPanel data={[asset]} cardColumns={cardColumns} />;
};

export { Asset, SingleAsset };
