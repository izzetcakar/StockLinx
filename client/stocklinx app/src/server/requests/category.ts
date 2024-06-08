import { QueryFilter } from "@/interfaces/gridTableInterfaces";
import { getQueryFilter } from "@/utils/filterUtilts";
import { ICategory } from "@interfaces/serverInterfaces";
import { request } from "@request";
const requestUrl = "Category/";

const getAll = async (): Promise<ICategory[]> => {
  return (await request<ICategory>({ requestUrl: requestUrl, apiType: "get" }))
    .data as ICategory[];
};

const get = async (id: string): Promise<ICategory> => {
  return (
    await request<ICategory>({
      requestUrl: requestUrl + id,
      apiType: "get",
    })
  ).data as ICategory;
};

const create = async (category: ICategory): Promise<ICategory> => {
  return (
    await request<ICategory>({
      requestUrl: requestUrl,
      apiType: "post",
      queryData: category,
    })
  ).data as ICategory;
};

const createRange = async (categories: ICategory[]): Promise<ICategory[]> => {
  return (
    await request<ICategory>({
      requestUrl: requestUrl + "range",
      apiType: "post",
      queryData: categories,
    })
  ).data as ICategory[];
};

const update = async (category: ICategory): Promise<ICategory> => {
  return (
    await request<ICategory>({
      requestUrl: requestUrl,
      apiType: "put",
      queryData: category,
    })
  ).data as ICategory;
};

const remove = (id: string) => {
  return request<ICategory>({
    requestUrl: requestUrl + id,
    apiType: "delete",
  });
};

const removeRange = (ids: string[]) => {
  return request<ICategory>({
    requestUrl: requestUrl + "range",
    apiType: "delete",
    queryData: ids,
  });
};

const filter = async (queryFilters: QueryFilter[]): Promise<ICategory[]> => {
  return (
    await request<ICategory>({
      requestUrl: requestUrl + "filter",
      apiType: "get",
      params: getQueryFilter(queryFilters),
    })
  ).data as ICategory[];
};

export const categoryRequests = {
  getAll,
  get,
  create,
  createRange,
  update,
  remove,
  removeRange,
  filter,
};
