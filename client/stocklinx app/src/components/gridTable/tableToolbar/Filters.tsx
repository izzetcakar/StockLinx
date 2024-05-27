import { Button, Flex } from "@mantine/core";
import { useFilter, useInputFilter } from "../customhooks/filter";
import { Filter, QueryFilter } from "../interfaces/interfaces";

interface FiltersProps {
  filters: Filter[];
  applyFilters: (queryFilters: QueryFilter[]) => void;
}

const FilterInput = (filter: Filter) => {
  return useInputFilter(filter).getFilterInput();
};

const Filters: React.FC<FiltersProps> = ({ filters, applyFilters }) => {
  const { buildQueryFilters } = useFilter();
  return (
    <Flex wrap={"wrap"} gap={10} align={"flex-end"}>
      {filters.map((filter) => {
        return (
          <div key={filter.columnId}>
            <FilterInput {...filter} />
          </div>
        );
      })}
      <Button
        variant="light"
        color="blue"
        onClick={() => applyFilters(buildQueryFilters())}
      >
        Apply
      </Button>
    </Flex>
  );
};

export default Filters;
