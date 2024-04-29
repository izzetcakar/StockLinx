import { UserProductCheckInPayload } from "../../interfaces/clientInterfaces";
import { IConsumable } from "../../interfaces/serverInterfaces";
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
const checkIn = (checkInDto: UserProductCheckInPayload) => {
  return request<IConsumable>({
    requestUrl: requestUrl + "checkin",
    apiType: "post",
    queryData: checkInDto,
  });
};
const checkOut = (id: string) => {
  return request<IConsumable>({
    requestUrl: requestUrl + "checkout/" + id,
    apiType: "post",
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
  checkIn,
  checkOut,
};
