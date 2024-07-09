import EntityPanel from "@/components/entity/EntityPanel";
import FilterPanel from "@/components/generic/FilterPanel";
import { useLocation } from "react-router-dom";
import { useColumns } from "./columns";
import { useUser } from "@/hooks/query/user";
import { useMemo } from "react";
import uuid4 from "uuid4";
import { Column } from "@/interfaces/gridTableInterfaces";

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
