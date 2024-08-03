import { FilterInputProps } from "@/interfaces/clientInterfaces";
import {
  Column,
  Filter,
  FilterType,
  LookupData,
  Operator,
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

export const trimValueByOperator = (value: string, operator: Operator) => {
  const trimmedValue = value.trim();
  switch (operator) {
    case Operator.CONTAINS:
      return trimmedValue.startsWith("%") && trimmedValue.endsWith("%")
        ? trimmedValue.slice(1, -1)
        : trimmedValue;
    case Operator.STARTSWITH:
      return trimmedValue.slice(0, -1);
    case Operator.ENDSWITH:
      return trimmedValue.slice(1);
    case Operator.EQUALS:
      return trimmedValue.slice(1);
    case Operator.GREATERTHAN:
      return trimmedValue.slice(1);
    case Operator.LESSTHAN:
      return trimmedValue.slice(1);
    case Operator.NOTEQUALS:
      return trimmedValue.slice(2);
    case Operator.GREATERTHANOREQUAL:
      return trimmedValue.slice(2);
    case Operator.LESSTHANOREQUAL:
      return trimmedValue.slice(2);
    default:
      return trimmedValue;
  }
};

export const getOperator = (value: string): Operator => {
  const trimmedValue = value.trim();
  const operatorPatterns: { [key: string]: RegExp } = {
    [Operator.CONTAINS]: /^%.*%$/,
    [Operator.STARTSWITH]: /^[^%]+%$/,
    [Operator.ENDSWITH]: /^%[^%]+$/,
    [Operator.EQUALS]: /^=/,
    [Operator.NOTEQUALS]: /^!=/,
    [Operator.GREATERTHANOREQUAL]: />=/,
    [Operator.LESSTHANOREQUAL]: /<=/,
    [Operator.GREATERTHAN]: /^>/,
    [Operator.LESSTHAN]: /^</,
  };

  for (const [operator, pattern] of Object.entries(operatorPatterns)) {
    if (pattern.test(trimmedValue)) {
      return operator as Operator;
    }
  }
  return Operator.CONTAINS;
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

export const FilterInput: React.FC<FilterInputProps> = ({
  filter,
  setFilter,
  column,
}) => {
  return useInputFilter(filter, setFilter, column).getFilterInput();
};
