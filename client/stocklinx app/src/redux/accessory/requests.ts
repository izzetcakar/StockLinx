import { IAccessory } from "../../interfaces/interfaces";
import { request } from "../../server/api";
const requestUrl = "Accessory/";

const getAll = () => {
  return request<IAccessory>({ requestUrl: requestUrl, apiType: "get" });
};
const get = (id: string) => {
  return request<IAccessory>({
    requestUrl: requestUrl + id,
    apiType: "get",
  });
};
const create = (accessory: IAccessory) => {
  return request<IAccessory>({
    requestUrl: requestUrl,
    apiType: "post",
    queryData: accessory,
  });
};
const createRange = (accessories: IAccessory[]) => {
  return request<IAccessory>({
    requestUrl: requestUrl + "range",
    apiType: "post",
    queryData: accessories,
  });
};
const update = (accessory: IAccessory) => {
  return request<IAccessory>({
    requestUrl: requestUrl,
    apiType: "put",
    queryData: accessory,
  });
};
const remove = (id: string) => {
  return request<IAccessory>({
    requestUrl: requestUrl + id,
    apiType: "delete",
  });
};
const removeRange = (ids: string[]) => {
  return request<IAccessory>({
    requestUrl: requestUrl + "range",
    apiType: "delete",
    queryData: ids,
  });
};

export const accessoryRequests = {
  getAll,
  get,
  create,
  createRange,
  update,
  remove,
  removeRange,
};
