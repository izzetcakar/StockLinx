import { useCallback, useState } from "react";
import { Column, Filter, FilterType } from "../interfaces/interfaces";
import { NumberInput, Select, TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import filterClasses from "./filter.module.scss";
import textInputClasses from "./textInput.module.scss";

export const useFilter = (
  columns: Column[],
  data: object[],
  resetPageNumber: () => void
) => {
  const [filters, setFilters] = useState<Filter[]>([]);

  const getFilterType = (field: string): FilterType => {
    const column = columns.find((column) => column.dataField === field);
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
  const getFilterInput = (filter: Filter) => {
    const searchIcon = <IconSearch size={16} />;
    if (filter.isAction) return null;
    switch (filter.type) {
      case FilterType.TEXT:
        return (
          <TextInput
            value={filter.value ? (filter.value as string) : ""}
            onChange={(e) => handleFilterChange(e, filter)}
            classNames={textInputClasses}
            icon={searchIcon}
            variant="filled"
          />
        );
      case FilterType.NUMBER:
        return (
          <NumberInput
            value={filter.value ? (filter.value as number) : ""}
            onChange={(e) => handleFilterChange(e, filter)}
            classNames={textInputClasses}
            icon={searchIcon}
            variant="filled"
            hideControls
          />
        );
      case FilterType.BOOLEAN:
        return (
          <Select
            classNames={filterClasses}
            placeholder="All"
            value={filter.value as string}
            data={filterLookupData(filter.field)}
            onChange={(e) => handleFilterChange(e, filter)}
            variant="filled"
            radius={0}
            searchable
            clearable
            withinPortal
          />
        );
      case FilterType.LOOKUP:
        return (
          <Select
            classNames={filterClasses}
            placeholder="All"
            value={filter.value as string}
            data={filterLookupData(filter.field)}
            onChange={(e) => handleFilterChange(e, filter)}
            variant="filled"
            radius={0}
            searchable
            clearable
            withinPortal
          />
        );
    }
  };
  const filterLookupData = (field: string) => {
    const column = columns.find((column) => column.dataField === field);
    if (!column || !column.lookup) return [];

    return (column.lookup.dataSource as { [key: string]: any }[]).map(
      (item) => {
        if (!column.lookup) {
          return { value: "", label: "" };
        }
        return {
          value: item[column.lookup.valueExpr as string],
          label: item[column.lookup.displayExpr as string],
        };
      }
    );
  };
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
    resetPageNumber();
    const newValue = getFilterChangedValue(e, filter);
    const newIsApplied = newValue === null || newValue === "" ? false : true;
    setFilters((prev) =>
      prev.map((item) =>
        item.field === filter.field
          ? { ...item, value: newValue, isApplied: newIsApplied }
          : item
      )
    );
  };
  const applyFilterToData = (inputData: object[]) => {
    if (filters.length === 0) return inputData;
    return inputData.filter((item: { [key: string]: any }) => {
      let isMatch = true;
      filters.forEach((filter) => {
        if (filter.isApplied) {
          const value =
            typeof item[filter.field] === "string" && filter.type !== "lookup"
              ? item[filter.field].toLowerCase()
              : item[filter.field];
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
  const handleFilterAll = useCallback(() => {
    const newFilter: Filter[] = columns.map((column) => ({
      field: column.dataField,
      type: getFilterType(column.dataField),
      value: null,
      isApplied: false,
      isAction: column.dataType === "action",
    }));
    setFilters(newFilter);
  }, [data]);
  return {
    filters,
    getFilterType,
    getFilterInput,
    applyFilterToData,
    handleFilterAll,
  };
};
