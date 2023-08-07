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

export const accessoryRequests = {
  getAll,
  get,
  create,
  update,
  remove,
};
