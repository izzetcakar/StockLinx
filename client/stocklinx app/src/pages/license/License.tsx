import { useLicense } from "@/hooks/query/license";
import { Column } from "@/interfaces/gridTableInterfaces";
import { useEffect, useMemo } from "react";
import { useLocation as useRouterLocation } from "react-router-dom";
import { useColumns } from "./columns";
import uuid4 from "uuid4";
import FilterPanel from "@/components/generic/FilterPanel";
import EntityPanel from "@/components/entity/EntityPanel";

const License = () => {
  const { columns, cardColumns } = useColumns();
  const { data: licenses } = useLicense.Filter([]);
  const { mutate: applyFilters } = useLicense.ApplyFilters();
  const { state } = useRouterLocation();

  const filterColumns = useMemo(() => {
    return columns.map((column) => {
      return {
        ...column,
        id: uuid4(),
      };
    }) as Column[];
  }, [columns.length]);

  useEffect(() => {
    if (state) {
      console.log(state.licenses);
    }
  }, [state]);

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
        data={state?.licenses || licenses || []}
        cardColumns={cardColumns}
      />
    </div>
  );
};

export default License;
