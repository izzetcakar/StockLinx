import { FilterType, Filter } from "../interfaces/interfaces";
import { NumberInput, Select, TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import filterClasses from "./filter.module.scss";
import textInputClasses from "./textInput.module.scss";
import { useGridTableContext } from "../context/GenericStateContext";

export const useFilter = () => {
  const {
    filters,
    setFilters,
    clearRowSelection,
    clearCellSelection,
    gridColumns,
  } = useGridTableContext();

  const getFilterType = (columndId: string): FilterType => {
    const column = gridColumns.find((column) => column.id === columndId);
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
            data={filterLookupData(filter.columnId)}
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
            data={filterLookupData(filter.columnId)}
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
  const filterLookupData = (columnId: string) => {
    const column = gridColumns.find((column) => column.id === columnId);
    if (!column || !column.lookup) return [];

    return (column.lookup.defaultData as { [key: string]: any }[]).map(
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
    const newValue = getFilterChangedValue(e, filter);
    const newIsApplied = newValue === null || newValue === "" ? false : true;
    setFilters((prev) =>
      prev.map((item) =>
        item.columnId === filter.columnId
          ? { ...item, value: newValue, isApplied: newIsApplied }
          : item
      )
    );
  };
  const getFilteredData = (inputData: object[]) => {
    if (filters.length === 0) return inputData;
    return inputData.filter((item: { [key: string]: any }) => {
      let isMatch = true;
      filters.forEach((filter) => {
        if (filter.isApplied) {
          const itemValue = item[filter.field];
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
  const handleFilterAll = () => {
    const Filter: Filter[] = gridColumns.map((column) => ({
      columnId: column.id,
      type: getFilterType(column.dataField),
      value: null,
      isApplied: false,
      ...(column.lookup?.defaultData && {
        defaultData: column.lookup.defaultData,
      }),
      ...(column.lookup?.dataSource && {
        dataSource: column.lookup.dataSource,
      }),
    }));

    setFilters(Filter);
  };

  return {
    getFilterType,
    getFilterInput,
    getFilteredData,
    handleFilterAll,
  };
};
