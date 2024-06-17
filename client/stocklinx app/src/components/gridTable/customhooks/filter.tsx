import {
  FilterType,
  Filter,
  LookupData,
  Column,
  QueryFilter,
  AppliedFilter,
} from "@interfaces/gridTableInterfaces";
import { Loader, MultiSelect, Select, TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { UseGridTableContext } from "../context/GenericStateContext";
import { useState } from "react";
import {
  checkValidNumberInput,
  convertValueByType,
  getFilterChangedValue,
  getFilterTypeByColumn,
  getFinalValue,
  getOperator,
  trimValueByOperator,
} from "@/utils/filterUtilts";

const useInputFilter = (filter: Filter) => {
  const { gridColumns, setFilters } = UseGridTableContext();
  const column = gridColumns.find((c) => c.id === filter.columnId);
  const [loading, setLoading] = useState(false);
  const [filterData, setFilterData] = useState<LookupData[]>(
    column?.lookup?.data || []
  );

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
      const { data } = await dataSource();
      setFilterData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setFilterData([]);
    } finally {
      setLoading(false);
    }
  };

  const getFilterInput = () => {
    const searchIcon = <IconSearch size={14} />;
    const label = column?.caption || "";

    switch (filter.type) {
      case FilterType.TEXT:
        return (
          <TextInput
            label={label}
            value={filter.value || ""}
            onChange={(e) => onValueChange(e, filter)}
            leftSection={searchIcon}
          />
        );
      case FilterType.NUMBER:
        return (
          <TextInput
            label={label}
            value={filter.value || ""}
            onChange={(e) => onValueChange(e, filter)}
            error={checkValidNumberInput(filter.value?.toString() || "")}
            leftSection={searchIcon}
          />
        );
      case FilterType.BOOLEAN:
        return (
          <Select
            label={label}
            placeholder="All"
            value={filter.value === "true" ? "true" : "false"}
            data={loading ? [] : filterData}
            onChange={(e) => onValueChange(e, filter)}
            rightSection={loading ? <Loader size={16} /> : null}
          />
        );
      case FilterType.LOOKUP:
        return (
          <MultiSelect
            label={label}
            placeholder="All"
            value={filter.value ? (filter.value as string).split(";") : []}
            data={loading ? [] : filterData}
            onChange={(e) => onValueChange(e, filter)}
            onDropdownOpen={getData}
            rightSection={loading ? <Loader size={16} /> : null}
            maxDropdownHeight={200}
            multiple
            searchable
            clearable
          />
        );
    }
  };

  return { getFilterInput };
};

const useFilter = () => {
  const { gridColumns, filters, setFilters } = UseGridTableContext();

  const setBaseFiltersByColumns = (columns: Column[]) => {
    const newFilters: Filter[] = columns.map(
      (column) =>
        ({
          columnId: column.id,
          type: getFilterTypeByColumn(column),
          value: null,
        } as Filter)
    );
    setFilters(newFilters);
  };

  const processFilterValues = (filter: AppliedFilter) => {
    const filterValue = filter.value.toString().trim();
    const dataType =
      gridColumns.find((c) => c.dataField === filter.dataField)?.dataType ||
      "string";
    if (dataType === "action") return;
    if (dataType === "number" && checkValidNumberInput(filter.value)) return;
    if (filterValue.includes(";")) {
      return filterValue
        .split(";")
        .filter((value) => value !== "")
        .map((value) => {
          const operator = getOperator(value);
          return {
            dataField: filter.dataField,
            operator: operator,
            value: convertValueByType(
              trimValueByOperator(value, operator),
              dataType
            ),
          };
        });
    }
    const operator = getOperator(filterValue);
    return {
      dataField: filter.dataField,
      operator: operator,
      value: convertValueByType(
        trimValueByOperator(filterValue, operator),
        dataType
      ),
    };
  };

  const getQueryFilters = (): QueryFilter[] => {
    const activeFilters = filters.filter(
      (filter) =>
        filter.value !== "" &&
        filter.value !== null &&
        filter.value !== undefined
    );
    let queryFilters: QueryFilter[] = [];

    activeFilters.forEach((filter) => {
      const column = gridColumns.find((c) => c.id === filter.columnId);
      if (!column) return;

      const processedFilters = processFilterValues({
        dataField: column.dataField,
        value: getFinalValue(filter.value as string, filter.type),
      });

      if (Array.isArray(processedFilters)) {
        queryFilters = queryFilters.concat(processedFilters);
      } else if (processedFilters) {
        queryFilters.push(processedFilters);
      }
    });

    return queryFilters;
  };

  return {
    setBaseFiltersByColumns,
    getQueryFilters,
  };
};

export const filterHooks = {
  useInputFilter,
  useFilter,
};
