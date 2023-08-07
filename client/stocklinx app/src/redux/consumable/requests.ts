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

export const consumableRequests = {
  getAll,
  get,
  create,
  update,
  remove,
};
