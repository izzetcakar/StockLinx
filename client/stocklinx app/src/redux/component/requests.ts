import { QueryFilter } from "@/interfaces/gridTableInterfaces";
import { getQueryFilter } from "@/utils/filterUtilts";
import {
  AssetProductCheckInDto,
  AssetProductCheckOutDto,
} from "@interfaces/dtos";
import { IComponent } from "@interfaces/serverInterfaces";
import { request } from "@request";
const requestUrl = "Component/";

const getAll = () => {
  return request<IComponent>({ requestUrl: requestUrl, apiType: "get" });
};

const get = (id: string) => {
  return request<IComponent>({
    requestUrl: requestUrl + id,
    apiType: "get",
  });
};

const create = (component: IComponent) => {
  return request<IComponent>({
    requestUrl: requestUrl,
    apiType: "post",
    queryData: component,
  });
};

const createRange = (components: IComponent[]) => {
  return request<IComponent>({
    requestUrl: requestUrl + "range",
    apiType: "post",
    queryData: components,
  });
};

const update = (component: IComponent) => {
  return request<IComponent>({
    requestUrl: requestUrl,
    apiType: "put",
    queryData: component,
  });
};

const remove = (id: string) => {
  return request<IComponent>({
    requestUrl: requestUrl + id,
    apiType: "delete",
  });
};

const removeRange = (ids: string[]) => {
  return request<IComponent>({
    requestUrl: requestUrl + "range",
    apiType: "delete",
    queryData: ids,
  });
};

const checkIn = (checkInDto: AssetProductCheckInDto) => {
  return request<IComponent>({
    requestUrl: requestUrl + "checkin",
    apiType: "post",
    queryData: checkInDto,
  });
};

const checkOut = (checkOutDto: AssetProductCheckOutDto) => {
  return request<IComponent>({
    requestUrl: requestUrl + "checkout",
    apiType: "post",
    queryData: checkOutDto,
  });
};

const filter = (queryFilters: QueryFilter[]) => {
  return request<IComponent>({
    requestUrl: requestUrl + "filter",
    apiType: "get",
    params: getQueryFilter(queryFilters),
  });
};

export const componentRequests = {
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
