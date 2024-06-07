import { Column, Filter, QueryFilter } from "@/interfaces/gridTableInterfaces";
import { FilterInput, useFilter } from "@/utils/filterUtilts";
import { Button, Flex } from "@mantine/core";
import { useEffect, useState } from "react";

interface FilterPanelProps {
  columns: Column[];
  applyFilters: (queryFilters: QueryFilter[]) => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ columns, applyFilters }) => {
  const [filters, setFilters] = useState<Filter[]>([]);
  const { setBaseFiltersByColumns } = useFilter(columns, filters, setFilters);
  const { getQueryFilters } = useFilter(columns, filters, setFilters);

  useEffect(() => {
    setBaseFiltersByColumns(columns);
  }, [columns]);

  const setFilter = (columnId: string, value: any) => {
    setFilters((prevFilters) => {
      return prevFilters.map((filter) => {
        if (filter.columnId === columnId) {
          return { ...filter, value };
        }
        return filter;
      });
    });
  };

  const getColumn = (columnId: string) => {
    return columns.find((column) => column.id === columnId) as Column;
  };

  return (
    <Flex wrap={"wrap"} gap={10} align={"flex-end"}>
      {filters.map((filter) => {
        return (
          <div key={filter.columnId}>
            <FilterInput
              filter={filter}
              setFilter={(value) => setFilter(filter.columnId, value)}
              column={getColumn(filter.columnId)}
            />
          </div>
        );
      })}
      <Button
        variant="light"
        color="blue"
        onClick={() => applyFilters(getQueryFilters())}
      >
        Apply
      </Button>
    </Flex>
  );
};

export default FilterPanel;
