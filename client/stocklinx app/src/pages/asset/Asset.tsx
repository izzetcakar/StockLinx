import { useMemo } from "react";
import { useColumns } from "./columns";
import { Column } from "@/interfaces/gridTableInterfaces";
import { useAsset } from "@/hooks/asset";
import FilterPanel from "@/components/generic/FilterPanel";
import uuid4 from "uuid4";

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
    <div>
      <FilterPanel
        columns={filterColumns}
        applyFilters={(filters) => applyFilters(filters)}
      />
      {assets?.map((asset) => {
        return (
          <div key={asset.id}>
            <div>{asset.tag}</div>
          </div>
        );
      })}
    </div>
  );
};

export default Asset;
