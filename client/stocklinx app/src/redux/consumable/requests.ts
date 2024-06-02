import { QueryFilter } from "@/interfaces/gridTableInterfaces";
import { getQueryFilter } from "@/utils/filterUtilts";
import {
  UserProductCheckInDto,
  UserProductCheckOutDto,
} from "@interfaces/dtos";
import { IConsumable } from "@interfaces/serverInterfaces";
import { request } from "@request";
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

const checkIn = (checkInDto: UserProductCheckInDto) => {
  return request<IConsumable>({
    requestUrl: requestUrl + "checkin",
    apiType: "post",
    queryData: checkInDto,
  });
};

const checkOut = (checkOutDto: UserProductCheckOutDto) => {
  return request<IConsumable>({
    requestUrl: requestUrl + "checkout",
    apiType: "post",
    queryData: checkOutDto,
  });
};

const filter = (queryFilters: QueryFilter[]) => {
  return request<IConsumable>({
    requestUrl: requestUrl + "filter",
    apiType: "get",
    params: getQueryFilter(queryFilters),
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
  filter,
};
