import { useColumns } from "./columns";
import { useComponent } from "@queryhooks";
import { useLocation as useRouterLocation } from "react-router-dom";
import EntityPanel from "@/components/entity/EntityPanel";

const Component = () => {
  const { cardColumns } = useColumns();
  const { data: components } = useComponent.GetAll();
  const { state } = useRouterLocation();

  return (
    <EntityPanel
      data={state?.components || components || []}
      cardColumns={cardColumns}
    />
  );
};

export default Component;
