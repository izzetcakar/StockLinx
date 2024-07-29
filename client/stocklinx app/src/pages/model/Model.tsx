import { useColumns } from "./columns";
import { useModel } from "@queryhooks";
import { useLocation as useRouterLocation } from "react-router-dom";
import EntityPanel from "@/components/entity/EntityPanel";

const Model = () => {
  const { cardColumns } = useColumns();
  const { data: models } = useModel.GetAll();
  const { state } = useRouterLocation();

  return (
    <EntityPanel
      data={
        models?.filter((model) =>
          state?.models?.map((e: any) => e.id).includes(model.id)
        ) ||
        models ||
        []
      }
      cardColumns={cardColumns}
    />
  );
};

export default Model;
