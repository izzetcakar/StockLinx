import {
  FilterType,
  Filter,
  LookupData,
  Column,
  QueryFilter,
  AppliedFilter,
} from "../interfaces/interfaces";
import { Loader, MultiSelect, Select, TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useGridTableContext } from "../context/GenericStateContext";
import { useState } from "react";

const checkValidNumberInput = (value: string) => {
  const pattern = /^(?:\d+|%|<=|>=|!=|<|>|=|;)*$/;
  if (!pattern.test(value)) return "Invalid";
  return "";
};

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
        newValue = e.target.value === "" ? null : e.target.value;
        break;
      case FilterType.NUMBER:
        newValue = e.target.value.trim() === "" ? null : e.target.value.trim();
        break;
      case FilterType.BOOLEAN:
        // newValue = e.currentTarget.checked;
        newValue = e;
        break;
      case FilterType.LOOKUP:
        if (e.length === 0) {
          newValue = null;
        } else {
          newValue = e.map((item: string) => item).join(";");
        }
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
    const searchIcon = <IconSearch size={14} />;
    const label = column?.caption || "";

    switch (filter.type) {
      case FilterType.TEXT:
        return (
          <TextInput
            label={label}
            value={filter.value ? filter.value.toString() : ""}
            onChange={(e) => onValueChange(e, filter)}
            leftSection={searchIcon}
          />
        );
      case FilterType.NUMBER:
        return (
          <TextInput
            label={label}
            value={filter.value ? filter.value.toString() : ""}
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
            value={filter.value as string}
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
            value={
              filter.value
                ? (filter.value as string).split(";").map((v) => v.trim())
                : []
            }
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

export const useFilter = () => {
  const { gridColumns, filters, setFilters } = useGridTableContext();

  const determineFilterType = (column: Column): FilterType => {
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

  const applyFiltersToAllColumns = (columns: Column[]) => {
    const newFilters: Filter[] = columns.map(
      (column) =>
        ({
          columnId: column.id,
          type: determineFilterType(column),
          value: null,
        } as Filter)
    );
    setFilters(newFilters);
  };

  const convertValueByType = (value: string, type: string) => {
    switch (type) {
      case "number":
        return parseInt(value);
      case "boolean":
        return value === "true";
      case "string":
        return value;
      default:
        return value;
    }
  };

  const cleanValueByOperator = (value: string | number, operator: string) => {
    const trimmedValue = value.toString().trim();
    switch (operator) {
      case "contains":
        return trimmedValue.startsWith("%") && trimmedValue.endsWith("%")
          ? trimmedValue.slice(1, -1)
          : trimmedValue;
      case "startswith":
        return trimmedValue.slice(1);
      case "endswith":
        return trimmedValue.slice(0, -1);
      case "equals":
        return trimmedValue.slice(1);
      case "greaterthan":
        return trimmedValue.slice(1);
      case "lessthan":
        return trimmedValue.slice(1);
      case "notequals":
        return trimmedValue.slice(2);
      case "greaterthanorequal":
        return trimmedValue.slice(2);
      case "lessthanorequal":
        return trimmedValue.slice(2);
      default:
        return trimmedValue;
    }
  };

  const identifyOperator = (value: string) => {
    const trimmedValue = value.trim();

    const operatorPatterns: { [key: string]: RegExp } = {
      contains: /^%.*%$/,
      startswith: /^%[^%]+$/,
      endswith: /^[^%]+%$/,
      equals: /^=/,
      notequals: /^!=/,
      greaterthanorequal: />=/,
      lessthanorequal: /<=/,
      greaterthan: /^>/,
      lessthan: /^</,
    };

    for (const [operator, pattern] of Object.entries(operatorPatterns)) {
      if (pattern.test(trimmedValue)) {
        return operator;
      }
    }
    return "contains";
  };

  const processMultipleValues = (filter: AppliedFilter) => {
    const filterValue = filter.value.toString().trim() as string;
    const dataType =
      gridColumns.find((c) => c.dataField === filter.dataField)?.dataType ||
      "string";
    if (dataType === "action") return;
    if (dataType === "number" && isNaN(Number(filter.value))) return;
    if (filterValue.includes(";")) {
      return filterValue
        .split(";")
        .filter((value) => value !== "")
        .map((value) => {
          const operator = identifyOperator(value);
          return {
            dataField: filter.dataField,
            operator: operator,
            value: convertValueByType(cleanValueByOperator(value, operator), dataType),
          };
        });
    }
    const operator = identifyOperator(filterValue);
    return {
      dataField: filter.dataField,
      operator: operator,
      value: convertValueByType(cleanValueByOperator(filterValue, operator), dataType),
    };
  };

  const buildQueryFilters = (): QueryFilter[] => {
    const activeFilters = filters.filter((filter) => filter.value !== null);
    let queryFilters: QueryFilter[] = [];

    activeFilters.forEach((filter) => {
      const column = gridColumns.find((c) => c.id === filter.columnId);
      if (!column) return;

      const processedFilters = processMultipleValues({
        dataField: column.dataField,
        value: filter.value as string,
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
    applyFiltersToAllColumns,
    buildQueryFilters,
  };
};
