import { IConsumable } from "../../interfaces/interfaces";
import { request } from "../../server/api";
const requestUrl = "Consumable/";

const getAll = () => {
  return request<IConsumable>({ requestUrl: requestUrl, apiType: "get" });
};
const get = (id: string) => {
  return request<IConsumable>({
    requestUrl: requestUrl + id,
    apiType: "get",
  });
};
const create = (consumable: IConsumable) => {
  return request<IConsumable>({
    requestUrl: requestUrl,
    apiType: "post",
    queryData: consumable,
  });
};
const createRange = (consumables: IConsumable[]) => {
  return request<IConsumable>({
    requestUrl: requestUrl + "range",
    apiType: "post",
    queryData: consumables,
  });
};
const update = (consumable: IConsumable) => {
  return request<IConsumable>({
    requestUrl: requestUrl,
    apiType: "put",
    queryData: consumable,
  });
};
const remove = (id: string) => {
  return request<IConsumable>({
    requestUrl: requestUrl + id,
    apiType: "delete",
  });
};
const removeRange = (ids: string[]) => {
  return request<IConsumable>({
    requestUrl: requestUrl + "range",
    apiType: "delete",
    queryData: ids,
  });
};

export const consumableRequests = {
  getAll,
  get,
  create,
  createRange,
  update,
  remove,
  removeRange,
};
