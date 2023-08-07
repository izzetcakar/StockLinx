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

export const modelRequests = {
  getAll,
  get,
  create,
  update,
  remove,
};
