import { useCallback, useState } from "react";
import { Column, Filter, FilterType } from "../interfaces/interfaces";
import { Select, TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import filterClasses from "./filter.module.scss";
import textInputClasses from "./textInput.module.scss";

export const useFilter = (columns: Column[], data: object[]) => {
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
    // const selectIcon = <IconCaretDownFilled size={12} />;
    switch (filter.type) {
      case FilterType.TEXT:
        return (
          <TextInput
            value={filter.value ? (filter.value as string) : ""}
            onChange={(e) => handleFilterChange(e, filter)}
            classNames={textInputClasses}
            icon={searchIcon}
          />
        );
      case FilterType.NUMBER:
        return (
          <TextInput
            value={filter.value as string}
            onChange={(e) => handleFilterChange(e, filter)}
            variant="unstyled"
          />
        );
      case FilterType.BOOLEAN:
        return (
          <Select
            placeholder="All"
            data={filterLookupData(filter.field)}
            color="gray"
            radius={0}
            searchable
            clearable
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

  const handleFilterChange = (e: any, filter: Filter) => {
    const newValue = filter.type === FilterType.LOOKUP ? e : e.target.value;
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
    return inputData.filter((item: { [key: string]: any }) => {
      let isMatch = true;
      filters.forEach((filter) => {
        if (filter.isApplied) {
          const value =
            typeof item[filter.field] !== "string"
              ? item[filter.field]
              : item[filter.field].toLowerCase();
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
    const newFilter = columns.map((column) => ({
      field: column.dataField,
      type: getFilterType(column.dataField),
      isApplied: false,
      value: null,
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
