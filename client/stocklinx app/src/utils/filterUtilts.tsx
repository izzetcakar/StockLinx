import {
  AppliedFilter,
  Column,
  Filter,
  FilterType,
  LookupData,
  QueryFilter,
} from "@/interfaces/gridTableInterfaces";
import { Loader, MultiSelect, Select, TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import React, { useState } from "react";

export const checkValidNumberInput = (value: string) => {
  const pattern = /^(?:\d+|%|<=|>=|!=|<|>|=|;)*$/;
  if (!pattern.test(value)) return "Invalid";
  return "";
};

export const checkNumberContainsOperator = (value: string) => {
  const pattern = /(?:<=|>=|!=|<|>|=)/;
  return pattern.test(value);
};

export const getQueryFilter = (queryFilters: QueryFilter[]): object => {
  const filterString =
    queryFilters
      .map((filter) => {
        return `${filter.operator},${filter.dataField},${filter.value}`;
      })
      .join(" and ") || "";
  return {
    filter: filterString,
  };
};

export const getFinalValue = (value: string, type: FilterType): string => {
  value = value.trim();
  switch (type) {
    case FilterType.BOOLEAN:
      return value;
    case FilterType.TEXT:
      return value;
    case FilterType.NUMBER:
      return checkNumberContainsOperator(value) ? value : "=" + value;
    case FilterType.LOOKUP:
      return value
        .split(";")
        .map((v) => "=" + v)
        .join(";");
    default:
      return value;
  }
};

export const convertValueByType = (value: string, type: string) => {
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

export const trimValueByOperator = (value: string, operator: string) => {
  const trimmedValue = value.trim();
  switch (operator) {
    case "contains":
      return trimmedValue.startsWith("%") && trimmedValue.endsWith("%")
        ? trimmedValue.slice(1, -1)
        : trimmedValue;
    case "startswith":
      return trimmedValue.slice(0, -1);
    case "endswith":
      return trimmedValue.slice(1);
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

export const getOperator = (value: string) => {
  const trimmedValue = value.trim();
  const operatorPatterns: { [key: string]: RegExp } = {
    contains: /^%.*%$/,
    startswith: /^[^%]+%$/,
    endswith: /^%[^%]+$/,
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

export const getFilterChangedValue = (e: any, filterType: FilterType) => {
  let newValue: string | null;
  switch (filterType) {
    case FilterType.TEXT:
      newValue = e.target.value === "" ? null : e.target.value;
      break;
    case FilterType.NUMBER:
      newValue = e.target.value.trim() === "" ? null : e.target.value;
      break;
    case FilterType.BOOLEAN:
      // newValue = e.currentTarget.checked;
      newValue = e;
      break;
    case FilterType.LOOKUP:
      newValue = e.length === 0 ? null : e.join(";");
      break;
    default:
      newValue = e.target.value;
      break;
  }
  return newValue;
};

export const getFilterTypeByColumn = (column: Column): FilterType => {
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

export const useInputFilter = (
  filter: Filter,
  setFilter: (value: any) => void,
  column: Column
) => {
  const [loading, setLoading] = useState(false);
  const [filterData, setFilterData] = useState<LookupData[]>(
    column?.lookup?.data || []
  );

  const getFilterChangedValue = (e: any, filterType: FilterType) => {
    let newValue: string | null;
    switch (filterType) {
      case FilterType.TEXT:
        newValue = e.target.value === "" ? null : e.target.value;
        break;
      case FilterType.NUMBER:
        newValue = e.target.value.trim() === "" ? null : e.target.value;
        break;
      case FilterType.BOOLEAN:
        // newValue = e.currentTarget.checked;
        newValue = e;
        break;
      case FilterType.LOOKUP:
        newValue = e.length === 0 ? null : e.join(";");
        break;
      default:
        newValue = e.target.value;
        break;
    }
    return newValue;
  };

  const onValueChange = (e: any, filter: Filter) => {
    const newValue = getFilterChangedValue(e, filter.type);
    setFilter(newValue);
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

export const useFilter = (
  columns: Column[],
  filters: Filter[],
  setFilters: (newFilters: Filter[]) => void
) => {
  const getFilterType = (column: Column): FilterType => {
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

  const setBaseFiltersByColumns = (columns: Column[]) => {
    const newFilters: Filter[] = columns.map(
      (column) =>
        ({
          columnId: column.id,
          type: getFilterType(column),
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

  const trimValueByOperator = (value: string, operator: string) => {
    const trimmedValue = value.trim();
    switch (operator) {
      case "contains":
        return trimmedValue.startsWith("%") && trimmedValue.endsWith("%")
          ? trimmedValue.slice(1, -1)
          : trimmedValue;
      case "startswith":
        return trimmedValue.slice(0, -1);
      case "endswith":
        return trimmedValue.slice(1);
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

  const getOperator = (value: string) => {
    const trimmedValue = value.trim();
    const operatorPatterns: { [key: string]: RegExp } = {
      contains: /^%.*%$/,
      startswith: /^[^%]+%$/,
      endswith: /^%[^%]+$/,
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

  const processFilterValues = (filter: AppliedFilter) => {
    const filterValue = filter.value.toString().trim();
    const dataType =
      columns.find((c) => c.dataField === filter.dataField)?.dataType ||
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
      const column = columns.find((c) => c.id === filter.columnId);
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

interface FilterInputProps {
  filter: Filter;
  setFilter: (value: any) => void;
  column: Column;
}
export const FilterInput: React.FC<FilterInputProps> = ({
  filter,
  setFilter,
  column,
}) => {
  return useInputFilter(filter, setFilter, column).getFilterInput();
};
