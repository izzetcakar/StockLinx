import { IDepartment } from "../../interfaces/interfaces";
import { request } from "../../server/api";

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

export const departmentRequests = {
  getAll,
  get,
  create,
  update,
  remove,
};
