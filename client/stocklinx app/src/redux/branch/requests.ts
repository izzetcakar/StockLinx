import { QueryFilter } from "@/interfaces/gridTableInterfaces";
import { getQueryFilter } from "@/utils/filterUtilts";
import { IBranch } from "@interfaces/serverInterfaces";
import { request } from "@request";
const requestUrl = "Branch/";

const getAll = async (): Promise<IBranch[]> => {
  return (await request<IBranch>({ requestUrl: requestUrl, apiType: "get" }))
    .data as IBranch[];
};

const get = async (id: string): Promise<IBranch> => {
  return (
    await request<IBranch>({
      requestUrl: requestUrl + id,
      apiType: "get",
    })
  ).data as IBranch;
};

const create = async (branch: IBranch): Promise<IBranch> => {
  return (
    await request<IBranch>({
      requestUrl: requestUrl,
      apiType: "post",
      queryData: branch,
    })
  ).data as IBranch;
};

const createRange = async (branches: IBranch[]): Promise<IBranch[]> => {
  return (
    await request<IBranch>({
      requestUrl: requestUrl + "range",
      apiType: "post",
      queryData: branches,
    })
  ).data as IBranch[];
};

const update = async (branch: IBranch): Promise<IBranch> => {
  return (
    await request<IBranch>({
      requestUrl: requestUrl,
      apiType: "put",
      queryData: branch,
    })
  ).data as IBranch;
};

const remove = (id: string) => {
  return request<IBranch>({
    requestUrl: requestUrl + id,
    apiType: "delete",
  });
};

const removeRange = (ids: string[]) => {
  return request<IBranch>({
    requestUrl: requestUrl + "range",
    apiType: "delete",
    queryData: ids,
  });
};

const filter = async (queryFilters: QueryFilter[]): Promise<IBranch[]> => {
  return (
    await request<IBranch>({
      requestUrl: requestUrl + "filter",
      apiType: "get",
      params: getQueryFilter(queryFilters),
    })
  ).data as IBranch[];
};

export const branchRequests = {
  getAll,
  get,
  create,
  createRange,
  update,
  remove,
  removeRange,
  filter,
};
