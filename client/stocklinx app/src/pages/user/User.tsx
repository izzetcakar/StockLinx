import EntityPanel from "@/components/entity/EntityPanel";
import FilterPanel from "@/components/generic/FilterPanel";
import { useLocation } from "react-router-dom";
import { useColumns } from "./columns";
import { useUser } from "@queryhooks";
import { useMemo } from "react";
import { Column } from "@/interfaces/gridTableInterfaces";
import uuid4 from "uuid4";

const User = () => {
  const { state } = useLocation();
  const { columns, cardColumns } = useColumns();
  const { data: users } = useUser.Filter();
  const { mutate: applyFilters } = useUser.ApplyFilters();

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
        data={state?.users || users || []}
        cardColumns={cardColumns}
      />
    </div>
  );
};

export default User;
