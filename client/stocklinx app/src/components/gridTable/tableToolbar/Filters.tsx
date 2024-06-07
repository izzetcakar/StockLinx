import { Button, Flex } from "@mantine/core";
import { Filter, QueryFilter } from "@interfaces/gridTableInterfaces";
import { filterHooks } from "../customhooks/filter";

interface FiltersProps {
  filters: Filter[];
  applyFilters: (queryFilters: QueryFilter[]) => void;
}

const FilterInput = (filter: Filter) => {
  return filterHooks.useInputFilter(filter).getFilterInput();
};

const Filters: React.FC<FiltersProps> = ({ filters, applyFilters }) => {
  const { getQueryFilters } = filterHooks.useFilter();
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
        onClick={() => applyFilters(getQueryFilters())}
      >
        Apply
      </Button>
    </Flex>
  );
};

export default Filters;
