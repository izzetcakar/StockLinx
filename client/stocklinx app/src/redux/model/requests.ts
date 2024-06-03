import { QueryFilter } from "@/interfaces/gridTableInterfaces";
import { getQueryFilter } from "@/utils/filterUtilts";
import { IModel } from "@interfaces/serverInterfaces";
import { request } from "@request";
const requestUrl = "Model/";

const getAll = async (): Promise<IModel[]> => {
  return (await request<IModel>({ requestUrl: requestUrl, apiType: "get" }))
    .data as IModel[];
};

const get = async (id: string): Promise<IModel> => {
  return (
    await request<IModel>({
      requestUrl: requestUrl + id,
      apiType: "get",
    })
  ).data as IModel;
};

const create = async (consumable: IModel): Promise<IModel> => {
  return (
    await request<IModel>({
      requestUrl: requestUrl,
      apiType: "post",
      queryData: consumable,
    })
  ).data as IModel;
};

const createRange = async (consumables: IModel[]): Promise<IModel[]> => {
  return (
    await request<IModel>({
      requestUrl: requestUrl + "range",
      apiType: "post",
      queryData: consumables,
    })
  ).data as IModel[];
};

const update = async (consumable: IModel): Promise<IModel> => {
  return (
    await request<IModel>({
      requestUrl: requestUrl,
      apiType: "put",
      queryData: consumable,
    })
  ).data as IModel;
};

const remove = (id: string) => {
  return request<IModel>({
    requestUrl: requestUrl + id,
    apiType: "delete",
  });
};

const removeRange = (ids: string[]) => {
  return request<IModel>({
    requestUrl: requestUrl + "range",
    apiType: "delete",
    queryData: ids,
  });
};

const filter = async (queryFilters: QueryFilter[]): Promise<IModel[]> => {
  return (
    await request<IModel>({
      requestUrl: requestUrl + "filter",
      apiType: "get",
      params: getQueryFilter(queryFilters),
    })
  ).data as IModel[];
};

export const modelRequests = {
  getAll,
  get,
  create,
  createRange,
  update,
  remove,
  removeRange,
  filter,
};
