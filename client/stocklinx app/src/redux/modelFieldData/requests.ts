import { IModelFieldData } from "../../interfaces/interfaces";
import { request } from "../../server/api";
const requestUrl = "ModelFieldData/";

const getAll = () => {
  return request<IModelFieldData>({ requestUrl: requestUrl, apiType: "get" });
};
const get = (id: string) => {
  return request<IModelFieldData>({
    requestUrl: requestUrl + id,
    apiType: "get",
  });
};
const create = (modelFieldData: IModelFieldData) => {
  return request<IModelFieldData>({
    requestUrl: requestUrl,
    apiType: "post",
    queryData: modelFieldData,
  });
};
const createRange = (modelFieldDatas: IModelFieldData[]) => {
  return request<IModelFieldData>({
    requestUrl: requestUrl + "range",
    apiType: "post",
    queryData: modelFieldDatas,
  });
};
const update = (modelFieldData: IModelFieldData) => {
  return request<IModelFieldData>({
    requestUrl: requestUrl,
    apiType: "put",
    queryData: modelFieldData,
  });
};
const remove = (id: string) => {
  return request<IModelFieldData>({
    requestUrl: requestUrl + id,
    apiType: "delete",
  });
};
const removeRange = (ids: string[]) => {
  return request<IModelFieldData>({
    requestUrl: requestUrl + "range",
    apiType: "delete",
    queryData: ids,
  });
};

export const modelFieldDataRequests = {
  getAll,
  get,
  create,
  createRange,
  update,
  remove,
  removeRange,
};
