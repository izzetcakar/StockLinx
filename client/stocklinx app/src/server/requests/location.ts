import { QueryFilter } from "@/interfaces/gridTableInterfaces";
import { getQueryFilter } from "@/utils/filterUtilts";
import { ILocation } from "@interfaces/serverInterfaces";
import { request } from "@request";
const requestUrl = "Location/";

const getAll = async (): Promise<ILocation[]> => {
  return (await request<ILocation>({ requestUrl: requestUrl, apiType: "get" }))
    .data as ILocation[];
};

const get = async (id: string): Promise<ILocation> => {
  return (
    await request<ILocation>({
      requestUrl: requestUrl + id,
      apiType: "get",
    })
  ).data as ILocation;
};

const create = async (consumable: ILocation): Promise<ILocation> => {
  return (
    await request<ILocation>({
      requestUrl: requestUrl,
      apiType: "post",
      queryData: consumable,
    })
  ).data as ILocation;
};

const createRange = async (consumables: ILocation[]): Promise<ILocation[]> => {
  return (
    await request<ILocation>({
      requestUrl: requestUrl + "range",
      apiType: "post",
      queryData: consumables,
    })
  ).data as ILocation[];
};

const update = async (consumable: ILocation): Promise<ILocation> => {
  return (
    await request<ILocation>({
      requestUrl: requestUrl,
      apiType: "put",
      queryData: consumable,
    })
  ).data as ILocation;
};

const remove = (id: string) => {
  return request<ILocation>({
    requestUrl: requestUrl + id,
    apiType: "delete",
  });
};

const removeRange = (ids: string[]) => {
  return request<ILocation>({
    requestUrl: requestUrl + "range",
    apiType: "delete",
    queryData: ids,
  });
};

const filter = async (queryFilters: QueryFilter[]): Promise<ILocation[]> => {
  return (
    await request<ILocation>({
      requestUrl: requestUrl + "filter",
      apiType: "get",
      params: getQueryFilter(queryFilters),
    })
  ).data as ILocation[];
};

export const locationRequests = {
  getAll,
  get,
  create,
  createRange,
  update,
  remove,
  removeRange,
  filter,
};
