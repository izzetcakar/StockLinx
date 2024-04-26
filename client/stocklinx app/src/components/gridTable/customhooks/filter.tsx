import { FilterType, Filter, LookupData } from "../interfaces/interfaces";
import { Loader, NumberInput, Select, TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useGridTableContext } from "../context/GenericStateContext";
import { useState } from "react";

export const useInputFilter = (filter: Filter) => {
  const { gridColumns, setFilters } = useGridTableContext();
  const column = gridColumns.find((c) => c.id === filter.columnId);
  const [loading, setLoading] = useState(false);
  const [filterData, setFilterData] = useState<LookupData[]>(
    column?.lookup?.data || []
  );

  const getFilterChangedValue = (e: any, filterType: FilterType) => {
    let newValue: string | number | boolean | null;
    switch (filterType) {
      case FilterType.TEXT:
        newValue = e.target.value;
        break;
      case FilterType.NUMBER:
        newValue = e;
        break;
      case FilterType.BOOLEAN:
        // newValue = e.currentTarget.checked;
        newValue = e;
        break;
      case FilterType.LOOKUP:
        newValue = e;
        break;
      default:
        newValue = e.target.value;
        break;
    }
    return newValue;
  };
  const onValueChange = (e: any, filter: Filter) => {
    const newValue = getFilterChangedValue(e, filter.type);
    setFilters((prev) =>
      prev.map((item) =>
        item.columnId === filter.columnId ? { ...item, value: newValue } : item
      )
    );
  };

  const getData = async () => {
    const dataSource = column?.lookup?.dataSource;
    if (!dataSource) return;
    setLoading(true);
    try {
      const data = await dataSource();
      setFilterData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setFilterData([]);
    } finally {
      setLoading(false);
    }
  };

  const getFilterInput = () => {
    const searchIcon = <IconSearch size={16} />;
    const label = column?.caption || "";

    switch (filter.type) {
      case FilterType.TEXT:
        return (
          <TextInput
            label={label}
            value={filter.value ? filter.value.toString() : ""}
            onChange={(e) => onValueChange(e, filter)}
            leftSection={<IconSearch size={16} />}
          />
        );
      case FilterType.NUMBER:
        return (
          <NumberInput
            label={label}
            value={filter.value ? parseInt(filter.value as string) : ""}
            onChange={(e) => onValueChange(e, filter)}
            leftSection={searchIcon}
            hideControls
          />
        );
      case FilterType.BOOLEAN:
        return (
          <Select
            label={label}
            placeholder="All"
            value={filter.value as string}
            data={loading ? [] : filterData}
            onChange={(e) => onValueChange(e, filter)}
            rightSection={loading ? <Loader size={16} /> : null}
            searchable
            clearable
          />
        );
      case FilterType.LOOKUP:
        return (
          <Select
            label={label}
            placeholder="All"
            value={filter.value as string}
            data={loading ? [] : filterData}
            onChange={(e) => onValueChange(e, filter)}
            onDropdownOpen={getData}
            rightSection={loading ? <Loader size={16} /> : null}
            searchable
            clearable
          />
        );
    }
  };

  return { getFilterInput };
};

export const useFilter = () => {
  const { gridColumns, setFilters } = useGridTableContext();

  const getTypeByColumnId = (columndId: string): FilterType => {
    const column = gridColumns.find((column) => column.id === columndId);
    if (!column) return FilterType.TEXT;
    if (column.lookup) return FilterType.LOOKUP;
    switch (column.dataType) {
      case "number":
        return FilterType.NUMBER;
      case "boolean":
        return FilterType.BOOLEAN;
      case "string":
      default:
        return FilterType.TEXT;
    }
  };

  const handleFilterAll = () => {
    const newFilters: Filter[] = gridColumns.map(
      (column) =>
        ({
          columnId: column.id,
          type: getTypeByColumnId(column.id),
          value: null,
        } as Filter)
    );
    setFilters(newFilters);
  };

  return {
    handleFilterAll,
  };
};
