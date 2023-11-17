import { ILocation } from "../../interfaces/interfaces";
import { request } from "../../server/api";
const requestUrl = "Location/";

const getAll = () => {
  return request<ILocation>({ requestUrl: requestUrl, apiType: "get" });
};
const get = (id: string) => {
  return request<ILocation>({
    requestUrl: requestUrl + id,
    apiType: "get",
  });
};
const create = (location: ILocation) => {
  return request<ILocation>({
    requestUrl: requestUrl,
    apiType: "post",
    queryData: location,
  });
};
const createRange = (locations: ILocation[]) => {
  return request<ILocation>({
    requestUrl: requestUrl + "range",
    apiType: "post",
    queryData: locations,
  });
};
const update = (location: ILocation) => {
  return request<ILocation>({
    requestUrl: requestUrl,
    apiType: "put",
    queryData: location,
  });
};
const remove = (id: string) => {
  return request<ILocation>({
    requestUrl: requestUrl + id,
    apiType: "delete",
  });
};
const removeRange = (ids: string[]) => {
  return request<ILocation>({
    requestUrl: requestUrl + "range",
    apiType: "delete",
    queryData: ids,
  });
};

export const locationRequests = {
  getAll,
  get,
  create,
  createRange,
  update,
  remove,
  removeRange,
};
