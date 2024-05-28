import { QueryFilter } from "@interfaces/gridTableInterfaces";
export const getQueryStringByFilters = (filters: QueryFilter[]): string => {
  const filterString = filters
    .map((filter) => {
      return `${filter.operator},${filter.dataField},${filter.value}`;
    })
    .join(" and ");
  return filterString || "";
};
