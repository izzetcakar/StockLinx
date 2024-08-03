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
      data={
        categories?.filter((category) =>
          state?.categories?.map((e: any) => e.id).includes(category.id)
        ) || []
      }
      cardColumns={cardColumns}
    />
  );
};

export default Category;
