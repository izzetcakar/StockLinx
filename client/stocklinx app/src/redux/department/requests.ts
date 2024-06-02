import { QueryFilter } from "@/interfaces/gridTableInterfaces";
import { getQueryFilter } from "@/utils/filterUtilts";
import { IDepartment } from "@interfaces/serverInterfaces";
import { request } from "@request";
const requestUrl = "Department/";

const getAll = () => {
  return request<IDepartment>({ requestUrl: requestUrl, apiType: "get" });
};

const get = (id: string) => {
  return request<IDepartment>({
    requestUrl: requestUrl + id,
    apiType: "get",
  });
};

const create = (department: IDepartment) => {
  return request<IDepartment>({
    requestUrl: requestUrl,
    apiType: "post",
    queryData: department,
  });
};

const createRange = (departments: IDepartment[]) => {
  return request<IDepartment>({
    requestUrl: requestUrl + "range",
    apiType: "post",
    queryData: departments,
  });
};

const update = (department: IDepartment) => {
  return request<IDepartment>({
    requestUrl: requestUrl,
    apiType: "put",
    queryData: department,
  });
};

const remove = (id: string) => {
  return request<IDepartment>({
    requestUrl: requestUrl + id,
    apiType: "delete",
  });
};

const removeRange = (ids: string[]) => {
  return request<IDepartment>({
    requestUrl: requestUrl + "range",
    apiType: "delete",
    queryData: ids,
  });
};

const filter = (queryFilters: QueryFilter[]) => {
  return request<IDepartment>({
    requestUrl: requestUrl + "filter",
    apiType: "get",
    params: getQueryFilter(queryFilters),
  });
};

export const departmentRequests = {
  getAll,
  get,
  create,
  createRange,
  update,
  remove,
  removeRange,
  filter,
};
