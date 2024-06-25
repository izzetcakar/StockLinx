import { useMemo } from "react";
import { useColumns } from "./columns";
import { Column } from "@/interfaces/gridTableInterfaces";
import { useCategory } from "@/hooks/query/category";
import { useLocation as useRouterLocation } from "react-router-dom";
import FilterPanel from "@/components/generic/FilterPanel";
import uuid4 from "uuid4";
import EntityPanel from "@/components/entity/EntityPanel";

const Category = () => {
  const { columns, cardColumns } = useColumns();
  const { data: categories } = useCategory.Filter([]);
  const { mutate: applyFilters } = useCategory.ApplyFilters();
  const { state } = useRouterLocation();

  const filterColumns = useMemo(() => {
    return columns.map((column) => {
      return {
        ...column,
        id: uuid4(),
      };
    }) as Column[];
  }, [columns.length]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <FilterPanel
        columns={filterColumns}
        applyFilters={(filters) => applyFilters(filters)}
      />
      <EntityPanel
        data={state?.categories || categories || []}
        cardColumns={cardColumns}
      />
    </div>
  );
};

export default Category;
