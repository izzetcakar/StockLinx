import { QueryFilter } from "@/interfaces/gridTableInterfaces";
import { getQueryFilter } from "@/utils/filterUtilts";
import { IModel } from "@interfaces/serverInterfaces";
import { request } from "@request";
const requestUrl = "Model/";

const getAll = () => {
  return request<IModel>({ requestUrl: requestUrl, apiType: "get" });
};

const get = (id: string) => {
  return request<IModel>({
    requestUrl: requestUrl + id,
    apiType: "get",
  });
};

const create = (model: IModel) => {
  return request<IModel>({
    requestUrl: requestUrl,
    apiType: "post",
    queryData: model,
  });
};

const createRange = (models: IModel[]) => {
  return request<IModel>({
    requestUrl: requestUrl + "range",
    apiType: "post",
    queryData: models,
  });
};

const update = (model: IModel) => {
  return request<IModel>({
    requestUrl: requestUrl,
    apiType: "put",
    queryData: model,
  });
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

const filter = (payload: QueryFilter[]) => {
  return request<IModel>({
    requestUrl: requestUrl + "filter",
    apiType: "get",
    queryData: getQueryFilter(payload),
  });
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
