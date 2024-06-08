import { QueryFilter } from "@/interfaces/gridTableInterfaces";
import { getQueryFilter } from "@/utils/filterUtilts";
import { IManufacturer } from "@interfaces/serverInterfaces";
import { request } from "@request";
const requestUrl = "Manufacturer/";

const getAll = async (): Promise<IManufacturer[]> => {
  return (
    await request<IManufacturer>({ requestUrl: requestUrl, apiType: "get" })
  ).data as IManufacturer[];
};

const get = async (id: string): Promise<IManufacturer> => {
  return (
    await request<IManufacturer>({
      requestUrl: requestUrl + id,
      apiType: "get",
    })
  ).data as IManufacturer;
};

const create = async (consumable: IManufacturer): Promise<IManufacturer> => {
  return (
    await request<IManufacturer>({
      requestUrl: requestUrl,
      apiType: "post",
      queryData: consumable,
    })
  ).data as IManufacturer;
};

const createRange = async (
  consumables: IManufacturer[]
): Promise<IManufacturer[]> => {
  return (
    await request<IManufacturer>({
      requestUrl: requestUrl + "range",
      apiType: "post",
      queryData: consumables,
    })
  ).data as IManufacturer[];
};

const update = async (consumable: IManufacturer): Promise<IManufacturer> => {
  return (
    await request<IManufacturer>({
      requestUrl: requestUrl,
      apiType: "put",
      queryData: consumable,
    })
  ).data as IManufacturer;
};

const remove = (id: string) => {
  return request<IManufacturer>({
    requestUrl: requestUrl + id,
    apiType: "delete",
  });
};

const removeRange = (ids: string[]) => {
  return request<IManufacturer>({
    requestUrl: requestUrl + "range",
    apiType: "delete",
    queryData: ids,
  });
};

const filter = async (
  queryFilters: QueryFilter[]
): Promise<IManufacturer[]> => {
  return (
    await request<IManufacturer>({
      requestUrl: requestUrl + "filter",
      apiType: "get",
      params: getQueryFilter(queryFilters),
    })
  ).data as IManufacturer[];
};

export const manufacturerRequests = {
  getAll,
  get,
  create,
  createRange,
  update,
  remove,
  removeRange,
  filter,
};
