import { lookupRequest, request } from "@/server/api";
import { getQueryFilter } from "./filterUtilts";
import { LookupData, QueryFilter } from "@/interfaces/gridTableInterfaces";

const getAll = async <T>(requestUrl: string): Promise<T[]> => {
  const response = await request<T[]>({
    requestUrl: requestUrl,
    apiType: "get",
  });
  return response.data as T[];
};

const get = async <T>(requestUrl: string, id: string): Promise<T> => {
  const response = await request<T>({
    requestUrl: requestUrl + id,
    apiType: "get",
  });
  return response.data as T;
};

const create = async <T>(requestUrl: string, data: T): Promise<T> => {
  const response = await request<T>({
    requestUrl: requestUrl,
    apiType: "post",
    queryData: data,
  });
  return response.data as T;
};

const createRange = async <T>(requestUrl: string, data: T[]): Promise<T[]> => {
  const response = await request<T[]>({
    requestUrl: requestUrl + "range",
    apiType: "post",
    queryData: data,
  });
  return response.data as T[];
};

const update = async <T>(requestUrl: string, data: T): Promise<T> => {
  const response = await request<T>({
    requestUrl: requestUrl,
    apiType: "put",
    queryData: data,
  });
  return response.data as T;
};

const remove = async (requestUrl: string, id: string): Promise<string> => {
  await request({
    requestUrl: requestUrl + id,
    apiType: "delete",
  });
  return id;
};

const removeRange = async (
  requestUrl: string,
  ids: string[]
): Promise<string[]> => {
  await request({
    requestUrl: requestUrl + "range",
    apiType: "delete",
    queryData: ids,
  });
  return ids;
};

const filter = async <T>(
  requestUrl: string,
  queryFilters: QueryFilter[]
): Promise<T[]> => {
  const response = await request<T[]>({
    requestUrl: requestUrl + "filter",
    apiType: "get",
    params: getQueryFilter(queryFilters),
  });
  return response.data as T[];
};

const lookup = async <T>(
  requestUrl: string,
  labelKeys = ["name"],
  valueKey = "id"
): Promise<LookupData[]> => {
  return await lookupRequest<T[]>({
    requestUrl: requestUrl,
    labelKeys,
    valueKey,
  });
};

const getDtos = async (requestUrl: string, ids: string[]) => {
  return (
    await request<any>({
      requestUrl: requestUrl + "display",
      apiType: "post",
      queryData: ids,
    })
  ).data;
};

export const baseRequests = {
  getAll,
  get,
  create,
  createRange,
  update,
  remove,
  removeRange,
  filter,
  lookup,
  getDtos,
};
