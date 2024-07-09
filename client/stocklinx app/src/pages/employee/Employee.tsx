import { useMemo } from "react";
import { useColumns } from "./columns";
import { Column } from "@/interfaces/gridTableInterfaces";
import { useEmployee } from "@/hooks/query/employee";
import { useLocation as useRouterLocation } from "react-router-dom";
import FilterPanel from "@/components/generic/FilterPanel";
import uuid4 from "uuid4";
import EntityPanel from "@/components/entity/EntityPanel";

const Employee = () => {
  const { columns, cardColumns } = useColumns();
  const { data: employees } = useEmployee.Filter();
  const { mutate: applyFilters } = useEmployee.ApplyFilters();
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
        data={state?.employees || employees || []}
        cardColumns={cardColumns}
      />
    </div>
  );
};

export default Employee;
