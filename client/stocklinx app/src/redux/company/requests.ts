import { ICompany } from "../../interfaces/interfaces";
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

export const companyRequests = {
  getAll,
  get,
  create,
  update,
  remove,
};
