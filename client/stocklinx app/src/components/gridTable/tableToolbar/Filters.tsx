import { Button, Flex } from "@mantine/core";
import { Filter, QueryFilter } from "@interfaces/gridTableInterfaces";
import { filterHooks } from "../customhooks/filter";
import { UseGridTableContext } from "../context/GenericStateContext";

interface FiltersProps {
  filters: Filter[];
  applyFilters: (queryFilters: QueryFilter[]) => void;
}

const FilterInput = (filter: Filter) => {
  return filterHooks.useInputFilter(filter).getFilterInput();
};

const Filters: React.FC<FiltersProps> = ({ filters, applyFilters }) => {
  const { getQueryFilters } = filterHooks.useFilter();
  const { clearFilters } = UseGridTableContext();

  const clearAllFilters = () => {
    clearFilters();
    applyFilters([]);
  };

  return (
    <Flex gap={10} align={"flex-end"} wrap={"wrap"}>
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
      <Button variant="light" color="red" onClick={() => clearAllFilters()}>
        Clear
      </Button>
    </Flex>
  );
};

export default Filters;
