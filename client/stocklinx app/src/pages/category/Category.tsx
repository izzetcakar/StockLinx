import { useColumns } from "./columns";
import { useCategory } from "@queryhooks";
import { useLocation as useRouterLocation } from "react-router-dom";
import EntityPanel from "@/components/entity/EntityPanel";

const Category = () => {
  const { cardColumns } = useColumns();
  const { data: categories } = useCategory.GetAll();
  const { state } = useRouterLocation();

  return (
    <EntityPanel
      data={state?.categories || categories || []}
      cardColumns={cardColumns}
    />
  );
};

export default Category;
