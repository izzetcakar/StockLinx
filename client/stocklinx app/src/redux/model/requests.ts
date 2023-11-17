import { IModel } from "../../interfaces/interfaces";
import { request } from "../../server/api";
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

export const modelRequests = {
  getAll,
  get,
  create,
  createRange,
  update,
  remove,
  removeRange,
};
