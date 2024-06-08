import { request } from "@/server/api";
import { getQueryFilter } from "./filterUtilts";
import { QueryFilter } from "@/interfaces/gridTableInterfaces";

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
    apiType: "post",
    params: getQueryFilter(queryFilters),
  });
  return response.data as T[];
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
};