import { ICompany } from "../../interfaces/serverInterfaces";
import { request } from "../../server/api";
const requestUrl = "Company/";

const getAll = () => {
  return request<ICompany>({ requestUrl: requestUrl, apiType: "get" });
};
const get = (id: string) => {
  return request<ICompany>({
    requestUrl: requestUrl + id,
    apiType: "get",
  });
};
const create = (company: ICompany) => {
  return request<ICompany>({
    requestUrl: requestUrl,
    apiType: "post",
    queryData: company,
  });
};
const createRange = (companies: ICompany[]) => {
  return request<ICompany>({
    requestUrl: requestUrl + "range",
    apiType: "post",
    queryData: companies,
  });
};
const update = (company: ICompany) => {
  return request<ICompany>({
    requestUrl: requestUrl,
    apiType: "put",
    queryData: company,
  });
};
const remove = (id: string) => {
  return request<ICompany>({
    requestUrl: requestUrl + id,
    apiType: "delete",
  });
};
const removeRange = (ids: string[]) => {
  return request<ICompany>({
    requestUrl: requestUrl + "range",
    apiType: "delete",
    queryData: ids,
  });
};

export const companyRequests = {
  getAll,
  get,
  create,
  createRange,
  update,
  remove,
  removeRange,
};
