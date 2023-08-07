import { ILicense } from "../../interfaces/interfaces";
import { request } from "../../server/api";

const requestUrl = "License/";

const getAll = () => {
  return request<ILicense>({ requestUrl: requestUrl, apiType: "get" });
};
const get = (id: string) => {
  return request<ILicense>({
    requestUrl: requestUrl + id,
    apiType: "get",
  });
};
const create = (license: ILicense) => {
  return request<ILicense>({
    requestUrl: requestUrl,
    apiType: "post",
    queryData: license,
  });
};
const update = (license: ILicense) => {
  return request<ILicense>({
    requestUrl: requestUrl,
    apiType: "put",
    queryData: license,
  });
};
const remove = (id: string) => {
  return request<ILicense>({
    requestUrl: requestUrl + id,
    apiType: "delete",
  });
};

export const licenseRequests = {
  getAll,
  get,
  create,
  update,
  remove,
};
