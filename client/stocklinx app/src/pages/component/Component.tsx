import { useColumns } from "./columns";
import { useComponent } from "@queryhooks";
import { useParams, useLocation as useRouterLocation } from "react-router-dom";
import EntityPanel from "@/components/entity/EntityPanel";
import CenterLoader from "@/components/mantine/CenterLoader";

const Component = () => {
  const { cardColumns } = useColumns();
  const { data: components } = useComponent.GetAll();
  const { state } = useRouterLocation();

  return (
    <EntityPanel
      data={
        components?.filter((component) =>
          state?.components?.map((e: any) => e.id).includes(component.id)
        ) ||
        components ||
        []
      }
      cardColumns={cardColumns}
    />
  );
};

const SingleComponent = () => {
  const { id } = useParams();
  const { cardColumns } = useColumns();
  const { data: component, isRefetching } = useComponent.Get(id as string);

  if (isRefetching) return <CenterLoader />;

  return <EntityPanel data={[component]} cardColumns={cardColumns} />;
};

export { Component, SingleComponent };
