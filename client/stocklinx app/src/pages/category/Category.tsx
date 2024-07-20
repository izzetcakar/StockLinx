import { useColumns } from "./columns";
import { useCategory } from "@queryhooks";
import { useLocation as useRouterLocation } from "react-router-dom";
import EntityPanel from "@/components/entity/EntityPanel";

const Category = () => {
  const { cardColumns } = useColumns();
  const { data: categories } = useCategory.Filter();
  const { state } = useRouterLocation();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <EntityPanel
        data={state?.categories || categories || []}
        cardColumns={cardColumns}
      />
    </div>
  );
};

export default Category;
