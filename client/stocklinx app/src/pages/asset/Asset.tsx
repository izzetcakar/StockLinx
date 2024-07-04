import { useMemo } from "react";
import { useColumns } from "./columns";
import { Column } from "@/interfaces/gridTableInterfaces";
import { useAsset } from "@/hooks/query/asset";
import { useLocation as useRouterLocation } from "react-router-dom";
import FilterPanel from "@/components/generic/FilterPanel";
import uuid4 from "uuid4";
import EntityPanel from "@/components/entity/EntityPanel";

const Asset = () => {
  const { columns, cardColumns } = useColumns();
  const { data: assets } = useAsset.Filter();
  const { mutate: applyFilters } = useAsset.ApplyFilters();
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
        data={state?.assets || assets || []}
        cardColumns={cardColumns}
      />
    </div>
  );
};

export default Asset;
