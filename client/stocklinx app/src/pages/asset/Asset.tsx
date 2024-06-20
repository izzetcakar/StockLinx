import { useMemo } from "react";
import { useColumns } from "./columns";
import { Column } from "@/interfaces/gridTableInterfaces";
import { useAsset } from "@/hooks/asset";
import FilterPanel from "@/components/generic/FilterPanel";
import uuid4 from "uuid4";
import EntityPanel from "@/components/entity/EntityPanel";

const Asset = () => {
  const columns = useColumns().columns;
  const { data: assets } = useAsset.Filter([]);
  const { mutate: applyFilters } = useAsset.ApplyFilters();

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
      }}
    >
      <FilterPanel
        columns={filterColumns}
        applyFilters={(filters) => applyFilters(filters)}
      />
      <EntityPanel
        data={assets || []}
        titleProp="name"
        columns={useColumns().cardColumns}
      />
    </div>
  );
};

export default Asset;
