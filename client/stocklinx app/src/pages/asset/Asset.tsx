import { useMemo } from "react";
import { useColumns } from "./columns";
import { Column } from "@/interfaces/gridTableInterfaces";
import FilterPanel from "@/components/generic/FilterPanel";
import uuid4 from "uuid4";
import { useAsset } from "@/queryhooks/asset";

const Asset = () => {
  const columns = useColumns().columns;
  const { data, mutate: applyFilters } = useAsset.Filter();

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
      {data?.map((asset) => {
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
