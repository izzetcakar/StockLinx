import { IManufacturer } from "../../interfaces/interfaces";
import { request } from "../../server/api";
const requestUrl = "Manufacturer/";

const getAll = () => {
  return request<IManufacturer>({ requestUrl: requestUrl, apiType: "get" });
};
const get = (id: string) => {
  return request<IManufacturer>({
    requestUrl: requestUrl + id,
    apiType: "get",
  });
};
const getPaged = (skip: number, take: number) => {
  return request<IManufacturer>({
    requestUrl: requestUrl + `paged?skip=${skip}&top=${take}`,
    apiType: "get",
  });
};
const create = (manufacturer: IManufacturer) => {
  return request<IManufacturer>({
    requestUrl: requestUrl,
    apiType: "post",
    queryData: manufacturer,
  });
};
const createRange = (manufacturers: IManufacturer[]) => {
  return request<IManufacturer>({
    requestUrl: requestUrl + "range",
    apiType: "post",
    queryData: manufacturers,
  });
};
const update = (manufacturer: IManufacturer) => {
  return request<IManufacturer>({
    requestUrl: requestUrl,
    apiType: "put",
    queryData: manufacturer,
  });
};
const remove = (id: string) => {
  return request<IManufacturer>({
    requestUrl: requestUrl + id,
    apiType: "delete",
  });
};
const removeRange = (ids: string[]) => {
  return request<IManufacturer>({
    requestUrl: requestUrl + "range",
    apiType: "delete",
    queryData: ids,
  });
};

export const manufacturerRequests = {
  getAll,
  getPaged,
  get,
  create,
  createRange,
  update,
  remove,
  removeRange,
};
