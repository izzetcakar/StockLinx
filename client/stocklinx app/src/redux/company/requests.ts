import { QueryFilter } from "@/interfaces/gridTableInterfaces";
import { getQueryFilter } from "@/utils/filterUtilts";
import { ICompany } from "@interfaces/serverInterfaces";
import { request } from "@request";
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

const filter = (queryFilters: QueryFilter[]) => {
  return request<ICompany>({
    requestUrl: requestUrl + "filter",
    apiType: "get",
    params: getQueryFilter(queryFilters),
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
  filter,
};
