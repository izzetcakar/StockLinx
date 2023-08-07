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
const create = (manufacturer: IManufacturer) => {
  return request<IManufacturer>({
    requestUrl: requestUrl,
    apiType: "post",
    queryData: manufacturer,
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

export const manufacturerRequests = {
  getAll,
  get,
  create,
  update,
  remove,
};
