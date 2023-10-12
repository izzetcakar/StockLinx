import { ILocation, ILocationCounts } from "../../interfaces/interfaces";
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
const getCounts = () => {
  return request<ILocationCounts>({
    requestUrl: requestUrl + "GetCounts",
    apiType: "get",
  });
};

export const locationRequests = {
  get,
  getAll,
  create,
  update,
  remove,
  getCounts,
};
