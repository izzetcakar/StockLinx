import { QueryFilter } from "@/interfaces/gridTableInterfaces";

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
