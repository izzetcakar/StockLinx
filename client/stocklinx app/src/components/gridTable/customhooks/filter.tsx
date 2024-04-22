import {
  FilterType,
  Filter,
  Column,
  LookupData,
} from "../interfaces/interfaces";
import { Loader, NumberInput, Select, TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useGridTableContext } from "../context/GenericStateContext";
import { useState } from "react";

export const useInputFilter = (filter: Filter) => {
  const { gridColumns, setFilters } = useGridTableContext();
  const column = gridColumns.find((c) => c.id === filter.columnId);
  const [loading, setLoading] = useState(false);
  const [filterData, setFilterData] = useState<LookupData[]>(
    column?.lookup?.defaultData || []
  );

  const getFilterChangedValue = (e: any, filter: Filter) => {
    let newValue: string | number | boolean | null;
    switch (filter.type) {
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
  const handleFilterChange = (e: any, filter: Filter) => {
    const newValue = getFilterChangedValue(e, filter);
    setFilters((prev) =>
      prev.map((item) =>
        item.columnId === filter.columnId ? { ...item, value: newValue } : item
      )
    );
  };

  const getFilterDataSource = async () => {
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
            onChange={(e) => handleFilterChange(e, filter)}
            icon={searchIcon}
          />
        );
      case FilterType.NUMBER:
        return (
          <NumberInput
            label={label}
            value={filter.value ? parseInt(filter.value as string) : ""}
            onChange={(e) => handleFilterChange(e, filter)}
            icon={searchIcon}
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
            onChange={(e) => handleFilterChange(e, filter)}
            rightSection={loading ? <Loader size={16} /> : null}
            searchable
            clearable
            withinPortal
          />
        );
      case FilterType.LOOKUP:
        return (
          <Select
            label={label}
            placeholder="All"
            value={filter.value as string}
            data={loading ? [] : filterData}
            onChange={(e) => handleFilterChange(e, filter)}
            onDropdownOpen={getFilterDataSource}
            rightSection={loading ? <Loader size={16} /> : null}
            searchable
            clearable
            withinPortal
          />
        );
    }
  };

  return { getFilterInput };
};

export const useFilter = () => {
  const { filters, setFilters, gridColumns } = useGridTableContext();

  const getFilterType = (
    columndId: string,
    inputColumns: Column[]
  ): FilterType => {
    const column = inputColumns.find((column) => column.id === columndId);
    if (!column) return FilterType.TEXT;
    if (column.lookup) return FilterType.LOOKUP;
    switch (column.dataType) {
      case "number":
        return FilterType.NUMBER;
      case "boolean":
        return FilterType.BOOLEAN;
      default:
        return FilterType.TEXT;
    }
  };
  const getFilteredData = (inputData: object[]) => {
    if (filters.length === 0) return inputData;
    return inputData.filter((item: { [key: string]: any }) => {
      let isMatch = true;
      filters.forEach((filter) => {
        if (filter.value) {
          const column = gridColumns.find(
            (column) => column.id === filter.columnId
          );
          if (!column) return;
          const itemValue = item[column.dataField];
          if (itemValue === null || itemValue === undefined) {
            isMatch = false;
            return;
          }
          const value =
            typeof itemValue === "string" && filter.type !== FilterType.LOOKUP
              ? itemValue.toString().toLowerCase()
              : itemValue.toString();
          switch (filter.type) {
            case FilterType.TEXT:
              isMatch =
                isMatch &&
                value.includes((filter.value as string).toLowerCase());
              break;
            case FilterType.NUMBER:
              isMatch = isMatch && value === filter.value;
              break;
            case FilterType.BOOLEAN:
              isMatch = isMatch && value === filter.value;
              break;
            case FilterType.LOOKUP:
              isMatch = isMatch && value === filter.value;
              break;
          }
        }
      });
      return isMatch;
    });
  };
  const handleFilterAll = (inputColumns: Column[]) => {
    const newFilters: Filter[] = inputColumns.map(
      (column) =>
        ({
          defaultData: column.lookup?.defaultData || [],
          columnId: column.id,
          type: getFilterType(column.id, inputColumns),
          value: null,
          isApplied: false,
          dataSource: column.lookup?.dataSource,
        } as Filter)
    );
    setFilters(newFilters);
  };

  return {
    getFilterType,
    getFilteredData,
    handleFilterAll,
  };
};
